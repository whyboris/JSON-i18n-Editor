import { Pipe, PipeTransform } from '@angular/core';
import { TranslationItem } from './app.component';

@Pipe({
  name: 'mySelectionPipe'
})
export class PagePipe implements PipeTransform {

  constructor() { }

  /**
   * Return only items that match search string
   */
  transform(data: TranslationItem[], pageSelect: string): any {

    console.log(pageSelect);

    if (pageSelect === 'none') {
      return data;
    }

    return data.filter((element) => {
      return element.category === pageSelect;
    });
  }

}
