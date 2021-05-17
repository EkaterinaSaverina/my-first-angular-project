import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPreviewComponent {
  @Input() title: string;
  @Input() id: string;
  @ViewChild('boardNewTitle') boardNewTitle: ElementRef;

  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();

  isEditMode = false;

  constructor() { }

  changeEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.boardNewTitle.nativeElement.focus();
    });
  }

  updateTitle(boardNewTitle: string): void {
    this.onUpdate.emit(boardNewTitle);
    this.isEditMode = false;
  }
}
