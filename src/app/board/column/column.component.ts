import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() title: string;
  @Input() id: string;
  @ViewChild('columnNewTitle') columnNewTitle: ElementRef;

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();

  isEditMode = false;

  constructor() { }

  changeEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.columnNewTitle.nativeElement.focus();
    });
  }

  updateTitle(columnNewTitle: string): void {
    this.onUpdate.emit(columnNewTitle);
    this.isEditMode = false;
  }
}
