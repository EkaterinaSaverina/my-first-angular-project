import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Task } from 'src/app/core/models';
import { TaskService } from 'src/app/core/services';
import { trackById } from 'src/app/core/utils';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @ViewChild('columnNewTitle') columnNewTitle: ElementRef;

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();

  taskNewTitle: string;
  trackById = trackById;
  isEditMode = false;

  tasks$: Promise<Task[]>;

  constructor(
    private taskService: TaskService,
    private ref: ChangeDetectorRef,
  ) { }

  changeEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.columnNewTitle.nativeElement.focus();
    });
  }

  updateTitle(taskNewTitle: string): void {
    this.onUpdate.emit(taskNewTitle);
    this.isEditMode = false;
  }

  clear(): void {
    this.taskNewTitle = '';
    this.ref.markForCheck();
  }

  async addTask(): Promise<void> {
    if (!this.taskNewTitle) { return; }
    await this.taskService.addTask(this.id, this.taskNewTitle);
    this.clear();
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks(this.id);
  }
}
