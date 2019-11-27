import { Component, OnInit } from '@angular/core';

import { FileService, ServerResponse } from './file.service';

export type AllowedLanguage = 'en' | 'de' | 'it';

export interface LoginInterface {
  name: string;
  password: string;
  language: AllowedLanguage;
}

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

  languageMap: Map<AllowedLanguage, string> = new Map([
    ['en', 'English'],
    ['it', 'Italian'],
    ['de', 'German'],
  ]);

  categories: string[];
  context: string[];
  filterText = '';
  filterText2 = '';
  isLoggedIn = false;
  loading = true;
  loginError = false;
  mainObject: TranslationItem[] = [];
  reviewedOnce: boolean;
  savingInProgress = false;
  selectedPage = 'none';
  viewType: ViewType = 'everything';
  waitingForServer = false;

  login: LoginInterface = {
    name: '',
    password: '',
    language: 'de'
  };

  languageOriginal: any;
  languageToTranslate: any;

  constructor(
    public fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  /**
   * Get all data from fileService
   * only start app when all data is received
   */
  async getAllData() {

    [this.languageOriginal, this.languageToTranslate] = await Promise.all([
      this.fileService.getSourceLanguage('en'),
      this.fileService.getLanguageToTranslate(this.login.language)
    ]);

    this.categories = this.getKeys(this.languageOriginal);
    this.mainObject = this.createMainObject(this.languageOriginal);
    this.loading = false;
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
          translation: this.languageToTranslate[category][name] || '',
          editedText: this.languageToTranslate[category][name] || '',
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

  changeLanguage(lol: AllowedLanguage): void {
    this.login.language = lol;
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

  tryLogin() {
    if (this.login.name && this.login.password) {
      this.waitingForServer = true;
      console.log(this.login);
      this.fileService.login(this.login).subscribe((data: ServerResponse) => {
        console.log('data');
        console.log(data);
        this.isLoggedIn = data.success;
        if (!data.success) {
          this.login.password = '';
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 1000);
        }
        this.waitingForServer = false;
      });
    }
  }

}

