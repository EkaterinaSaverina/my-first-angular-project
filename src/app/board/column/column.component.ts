import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() title: string;
  @Input() id: string;

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<string>();

  constructor() { }
}
