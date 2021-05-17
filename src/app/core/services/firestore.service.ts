import OrderByDirection = firebase.firestore.OrderByDirection;
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  delete(ref: string): Promise<void> {
    return this.firestore.doc(ref).delete();
  }

  handleError(error: any): Observable<any> {
    return of(error);
  }

  async addDocument<T>(collectionPath: string, data: T): Promise<string> {
    return (await this.firestore.collection<T>(collectionPath).add(data)).id;
  }

  getDocumentById<T>(collectionPath: string, id: string): Observable<T | null> {
    return this.firestore
      .doc<T>(`${collectionPath}/${id}`)
      .snapshotChanges()
      .pipe(
        map((snapshot: any) => {
          return snapshot.payload.exists
            ? {
              ...(snapshot.payload.data() as T),
              id: snapshot.payload.id,
            }
            : null;
        })
      );
  }

  getCollection<T>(ref: string): Observable<T[]> {
    const collectionRef = this.firestore.collection<T>(ref);
    return collectionRef
      .snapshotChanges()
      .pipe(map(this.mapKeysToCollectionObjects));
  }

  getDocument<T>(ref: string): Observable<T | null> {
    return this.firestore
      .doc<T>(ref)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.payload.exists
            ? {
              ...(snapshot.payload.data() as T),
              id: snapshot.payload.id,
            }
            : null;
        }),
        catchError(this.handleError)
      );
  }

  update<T>(ref: string, data: T): Promise<void> {
    return this.firestore.doc(ref).set(data, { merge: true });
  }

  private mapKeysToCollectionObjects<T>(
    actions: DocumentChangeAction<T>[]
  ): T[] {
    return actions.map((action: DocumentChangeAction<T>) => {
      const data = action.payload.doc.data() as T;
      const id = action.payload.doc.id;
      return {
        ...data,
        id,
      };
    });
  }
}
