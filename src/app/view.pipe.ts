import { Pipe, PipeTransform } from '@angular/core';

import { TranslationItem, ViewType } from './app.component';

@Pipe({
  name: 'myViewPipe'
})
export class ViewPipe implements PipeTransform {

  constructor() { }

  /**
   * Return only items that match search string
   */
  transform(data: TranslationItem[], view: ViewType): any {

    switch (view) {
      case 'everything':
        return data;
        break;
      case 'untranslated':
        return data.filter((element) => {
          return element.translation === '';
        });
        break;
      case 'modified':
        return data;
        break;
    }
  }

}
