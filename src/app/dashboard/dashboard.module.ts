import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardPreviewComponent } from './board-preview/board-preview.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
