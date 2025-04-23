import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DataService } from '../../../core/service/data.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-edit-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MessagesModule,
    TranslateModule,
    ButtonComponent,
  ],
  templateUrl: './edit-add.component.html',
  styleUrl: './edit-add.component.css',
})
export class EditAddComponent implements OnInit {
  label: 'Add' | 'Edit' = 'Add';

  _activatedRoute = inject(ActivatedRoute);
  _dataService = inject(DataService);
  _messageService = inject(MessageService);

  /* Init Form */
  userForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    body: new FormControl(null, Validators.required),
    userId: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.listener();
  }

  listener() {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.label = 'Edit';
        this.getUser();
      }
    });
  }

  getUser() {
    this._activatedRoute.data.subscribe((data) => {
      console.log(data['post']);
      this.userForm.patchValue(data['post']);
    });
  }

  updatePost() {
    this._dataService.updatePost(this.userForm.value).subscribe((res) => {
      console.log(res);
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post updated successfully',
      });
    });
  }

  createPost() {
    this._dataService.createPost(this.userForm.value).subscribe((res) => {
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully',
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.userForm.dirty) {
      if (this.label === 'Add') {
        this.createPost();
      } else {
        this.updatePost();
      }
    } else {
      this.markAllAsTouched();
      return;
    }
  }

  markAllAsTouched() {
    this.userForm.markAllAsTouched();
  }
}
