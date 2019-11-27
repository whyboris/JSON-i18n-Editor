import { Pipe, PipeTransform } from '@angular/core';
import { TranslationItem } from '../app.component';

@Pipe({
  name: 'mySearchPipe'
})
export class MySearchPipe implements PipeTransform {

  constructor() { }

  /**
   * Return only items that match search string
   */
  transform(data: TranslationItem[], searchText: string, original: boolean): any {

    if (!searchText) {
      return data;
    }

    return data.filter((element) => {
      return (original ? element.text : element.translation).toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
