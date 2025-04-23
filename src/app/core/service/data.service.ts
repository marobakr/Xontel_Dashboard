import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { data } from '../env/baseApis';
import { IPost } from '../interfaces/http';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _httpClient: HttpClient) {}

  getPosts(
    page: number = 1,
    pageSize: number = 15
  ): Observable<PaginatedResponse<IPost>> {
    return this._httpClient.get<IPost[]>(`${data}/posts`).pipe(
      map((posts) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = posts.slice(startIndex, endIndex);

        return {
          items: paginatedItems,
          total: posts.length,
          page: page,
          pageSize: pageSize,
          totalPages: Math.ceil(posts.length / pageSize),
        };
      })
    );
  }

  getPost(id: number) {
    return this._httpClient.get<IPost>(`${data}/posts/${id}`);
  }

  createPost(post: any) {
    return this._httpClient.post<any>(`${data}/posts`, post);
  }

  deletePost(id: number) {
    return this._httpClient.delete<any>(`${data}/posts/${id}`);
  }

  updatePost(post: any) {
    return this._httpClient.patch<any>(`${data}/posts/${post.id}`, post);
  }
}
