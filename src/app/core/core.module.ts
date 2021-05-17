import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseService, FirestoreService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: 'Window', useValue: window },
    { provide: 'Document', useValue: document },
    DatabaseService,
    FirestoreService,
  ],
})
export class CoreModule { }
