import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent {
  @Input() title: string;
  @Input() id: string;
  @Input() isEditMode: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();
  @Output() onChangeMode = new EventEmitter<boolean>();

  constructor() { }

}
