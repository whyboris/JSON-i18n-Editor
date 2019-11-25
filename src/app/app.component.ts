import { Component } from '@angular/core';

const en: any = require('../assets/en.json');

export interface TranslationItem {
  category: string;
  name: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // data = en;

  context: string[];

  filterText: string;

  mainObject: TranslationItem[];

  constructor() {
    this.mainObject = this.createMainObject(en);
  }

  /**
   * Get keys from any object
   */
  getKeys(anyObj): string[] {
    return Object.keys(anyObj);
  }

  // plan:
  // create array of objects:

  createMainObject(data): TranslationItem[] {

    const categories: string[] = this.getKeys(data);

    const returnObject = [];

    categories.forEach((category: string) => {
      const names: string[] = this.getKeys(data[category]);

      names.forEach((name) => {
        returnObject.push({
          category: category,
          name: name,
          text: data[category][name],
        });
      });
    });

    return returnObject;
  }

}
