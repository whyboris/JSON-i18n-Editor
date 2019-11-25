import { Pipe, PipeTransform } from '@angular/core';
import { TranslationItem } from './app.component';

@Pipe({
  name: 'mySearchPipe'
})
export class MySearchPipe implements PipeTransform {

  constructor() { }

  /**
   * Return only items that match search string
   */
  transform(data: TranslationItem[], searchText: string): any {

    console.log(searchText);

    if (!searchText) {
      return data;
    }

    return data.filter((element) => {
      return element.text.includes(searchText);
    });
  }

}
