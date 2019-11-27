import { Component } from '@angular/core';

import { FileService } from './file.service';

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

  categories: string[];
  context: string[];
  filterText = '';
  filterText2 = '';
  mainObject: TranslationItem[];
  savingInProgress = false;
  selectedPage = 'none';
  viewType: ViewType = 'everything';
  reviewedOnce: boolean;

  constructor(
    public fileService: FileService,
  ) {
    const en = this.fileService.get_en();

    this.categories = this.getKeys(en);
    this.mainObject = this.createMainObject(en);
  }

  /**
   * Get keys from any object
   */
  getKeys(anyObj: JSON): string[] {
    return Object.keys(anyObj);
  }

  /**
   * Flatten out the JSON into an easy-to use TranslationItem array
   */
  createMainObject(data: JSON): TranslationItem[] {

    const de = this.fileService.get_de();

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

  reviewNow(): void {
    this.filterText = '';
    this.filterText2 = '';
    this.viewType = 'modified';
    this.selectedPage = 'none';
    this.reviewedOnce = true;
  }

  /**
   * Create JSON
   */
  saveEverything() {
    this.savingInProgress = true;
    const toSave: any = {};

    this.categories.forEach((category) => {
      toSave[category] = {};
    });

    this.mainObject.forEach((element) => {
      toSave[element.category][element.name] = element.editedText.replace('\n', '');
    });
    console.log(toSave);
  }

}

