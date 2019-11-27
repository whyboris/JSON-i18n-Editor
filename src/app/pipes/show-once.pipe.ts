import { Pipe, PipeTransform } from '@angular/core';
import { TranslationItem } from '../app.component';

@Pipe({
  name: 'showOncePipe'
})
export class ShowOncePipe implements PipeTransform {

  constructor() { }

  /**
   * Return only items that match search string
   */
  transform(data: TranslationItem[]): any {

    let lastCategory =  '';

    data.forEach((element) => {
      element.showCategory = element.category !== lastCategory;
      lastCategory = element.category;
    });

    return data;
  }

}
