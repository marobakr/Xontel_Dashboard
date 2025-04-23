import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
@Component({
  selector: 'app-confirme-deleted',
  standalone: true,
  imports: [TranslateModule, ButtonComponent],
  templateUrl: './confirme-deleted.component.html',
  styleUrl: './confirme-deleted.component.css',
})
export class ConfirmeDeletedComponent {
  visible = false;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
