import { Component } from '@angular/core';

const en: any = require('../assets/en.json');
const de: any = require('../assets/de.json');

export interface TranslationItem {
  category: string;
  name: string;
  text: string;
  translation?: string;
  showCategory?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // data = en;

  context: string[];

  filterText = '';
  filterText2 = '';

  categories: string[];

  mainObject: TranslationItem[];

  selectedPage = 'none';

  constructor() {
    this.categories = this.getKeys(en);
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
          category,
          name,
          text: data[category][name],
          translation: de[category][name] || ''
        });
      });
    });

    return returnObject;
  }

  changeCategory(lol: any) {
    this.selectedPage = lol;
    console.log(lol);
  }


}

