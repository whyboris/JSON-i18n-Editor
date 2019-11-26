import { Component } from '@angular/core';

const en: any = require('../assets/en.json');
const de: any = require('../assets/de.json');

export interface TranslationItem {
  category: string;
  name: string;
  text: string;
  translation?: string;
  editedText?: string;
  showCategory?: boolean;
}

export type ViewType = 'everything' | 'modified' | 'untranslated';

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

  viewType: ViewType = 'everything';

  categories: string[];

  mainObject: TranslationItem[];

  selectedPage = 'none';

  savingInProgress = false;

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
          translation: de[category][name] || '',
          editedText: de[category][name] || '',
        });
      });
    });

    return returnObject;
  }

  changeView(lol: ViewType): void {
    console.log(lol);
    this.viewType = lol;
    this.scrollToTop();
  }

  changeCategory(lol: any): void {
    this.selectedPage = lol;
    this.scrollToTop();
  }

  scrollToTop(): void {
    document.getElementById('scrollDiv').scrollTop = 0;
  }

  saveEverything() {
    this.savingInProgress = true;
    console.log('saving lol');
  }

  changeHappened(lol) {
    console.log(lol[0]);
  }

}

