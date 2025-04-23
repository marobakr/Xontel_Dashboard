import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/http';
import { DataService } from '../service/data.service';

export const detailsResolver: ResolveFn<Observable<IPost>> = (route, state) => {
  const dataService = inject(DataService);
  const id = route.params['id'];
  return dataService.getPost(id);
};
