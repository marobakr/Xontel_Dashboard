import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IPost } from '../../core/interfaces/http';
import {
  DataService,
  PaginatedResponse,
} from '../../core/service/data.service';
import { LanguageService } from '../../core/service/language.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { EditComponent } from '../../shared/icons/edit/edit.component';
import { ExpandMoreIconComponent } from '../../shared/icons/expand-more/expand-more.component';
import { FilterIconComponent } from '../../shared/icons/filter/filter.component';
import { PlusIconComponent } from '../../shared/icons/plus/plus-icon.component';
import { ResetIconComponent } from '../../shared/icons/reset/reset.component';
import { TrashComponent } from '../../shared/icons/trash/trash.component';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ConfirmeDeletedComponent } from './components/confirme-deleted/confirme-deleted.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    FilterIconComponent,
    ExpandMoreIconComponent,
    ResetIconComponent,
    PlusIconComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    EditComponent,
    TrashComponent,
    ConfirmeDeletedComponent,
    RouterLink,
    AsyncPipe,
    TranslateModule,
    SearchPipe,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  @ViewChild(ConfirmeDeletedComponent) confirmDialog!: ConfirmeDeletedComponent;

  showFilterPopup = false;
  searchKey: any = '';
  tempSearchKey: any = ''; // Temporary storage for search value

  _dataService = inject(DataService);
  _languageService = inject(LanguageService);
  _messageService = inject(MessageService);

  products: IPost[] = [];
  private postIdToDelete: number | null = null;

  // Pagination properties
  first = 0;
  rows = 15;
  totalRecords = 0;
  currentPage = 1;

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._dataService.getPosts(this.currentPage, this.rows).subscribe({
      next: (response: PaginatedResponse<IPost>) => {
        this.products = response.items;
        this.totalRecords = response.total;
        console.log('Paginated posts:', response);
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch posts',
        });
      },
    });
  }

  deletePost(postId: number) {
    this.postIdToDelete = postId;
    this.confirmDialog.show();
  }

  onConfirmDelete() {
    if (this.postIdToDelete) {
      this._dataService.deletePost(this.postIdToDelete).subscribe({
        next: () => {
          this.getPosts();
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post deleted successfully',
          });
          this.confirmDialog.hide();
          this.postIdToDelete = null;
        },
        error: (error) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete post',
          });
          this.confirmDialog.hide();
          this.postIdToDelete = null;
        },
      });
    }
  }

  onCancelDelete() {
    this.confirmDialog.hide();
    this.postIdToDelete = null;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = Math.floor(this.first / this.rows) + 1;
    this.getPosts();
  }

  isLastPage(): boolean {
    return this.first + this.rows >= this.totalRecords;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  toggleFilterPopup() {
    this.showFilterPopup = !this.showFilterPopup;
    if (!this.showFilterPopup) {
      this.tempSearchKey = this.searchKey; // Restore previous search when closing
    }
  }

  applyFilter() {
    this.searchKey = this.tempSearchKey;
    this.showFilterPopup = false;
  }
}
