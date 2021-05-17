import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { DatabaseService } from './database.service';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends DatabaseService {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  async getTasks(columnId: string): Promise<Task[]> {
    return this.list<Task>(`/tasks/${columnId}`).toPromise();
  }

  getTask(columnId: string): Observable<Task> {
    return this.object<Task>(`/tasks/${columnId}`);
  }

  async addTask(columnId: string, title: string): Promise<void> {
    return this.push<Task>(`/tasks/${columnId}`, { title });
  }

  async setTask(columnId: string, taskId: string, title: string): Promise<void> {
    return this.set<Task>(`/tasks/${columnId}/${taskId}/title`, title);
  }

  async deleteTas(columnId: string, taskId: string): Promise<void> {
    await this.remove<Task>(`/tasks/${columnId}/${taskId}`);
  }
}
