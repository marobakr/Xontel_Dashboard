import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../../core/interfaces/http';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(data: IPost[], search: string): IPost[] {
    if (search === null) return [];
    if (!data || !search) return data;
    return data.filter((item) => item.userId.toString().includes(search));
  }
}
