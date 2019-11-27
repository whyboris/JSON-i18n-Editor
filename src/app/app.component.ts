import { Component, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit {

  categories: string[];
  context: string[];
  filterText = '';
  filterText2 = '';
  mainObject: TranslationItem[] = [];
  savingInProgress = false;
  selectedPage = 'none';
  viewType: ViewType = 'everything';
  reviewedOnce: boolean;

  en: JSON;
  de: JSON;

  loading = true;

  constructor(
    public fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.en = this.fileService.get_en();
    this.de = this.fileService.get_de();

    setTimeout(() => {
      this.categories = this.getKeys(this.en);
      this.mainObject = this.createMainObject(this.en);
      this.loading = false;
    }, 2000);
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

    const categories: string[] = this.getKeys(data);

    const returnObject = [];

    categories.forEach((category: string) => {
      const names: string[] = this.getKeys(data[category]);

      names.forEach((name) => {
        returnObject.push({
          category,
          name,
          text: data[category][name],
          translation: this.de[category][name] || '',
          editedText: this.de[category][name] || '',
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

