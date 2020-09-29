import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSpinner$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
    this.showSpinner$ = spinner.getValue();
  }
}
