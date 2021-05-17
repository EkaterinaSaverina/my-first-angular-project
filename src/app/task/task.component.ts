import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @ViewChild('taskNewTitle') taskNewTitle: ElementRef;

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();

  isEditMode = false;

  constructor() { }

  changeEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.taskNewTitle.nativeElement.focus();
    });
  }

  updateTitle(taskNewTitle: string): void {
    this.onUpdate.emit(taskNewTitle);
    this.isEditMode = false;
  }

  ngOnInit(): void {
  }
}
