import { Component } from '@angular/core';

import { FileService, ServerResponse } from './file.service';

export type AllowedLanguage =
  | 'ar' // Arabic
  | 'de' // German
  | 'en' // English
  | 'es' // Spanish
  | 'fr' // French
  | 'ha' // Hausa
  | 'hi' // Hindi
  | 'it' // Italian
  | 'ja' // Japanese
  | 'ko' // Korean
  | 'pt' // Portuguese (Portugal, Brazil)
  | 'tr' // Turkish
  | 'ur' // Urdu
  | 'zh' // Chineze (Simplified) - "zh-CN"
;

export interface LoginInterface {
  name: string;
  pass: string;
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
  styleUrls: ['./app.component.scss',
              './login.scss']
})
export class AppComponent {

  languageMap: Map<AllowedLanguage, string> = new Map([
    ['ar', 'Arabic'],
    ['de', 'German'],
    ['en', 'English'],
    ['es', 'Spanish'],
    ['fr', 'French'],
    ['ha', 'Hausa'],
    ['hi', 'Hindi'],
    ['it', 'Italian'],
    ['ja', 'Japanese'],
    ['ko', 'Korean'],
    ['pt', 'Portuguese'],
    ['tr', 'Turkish'],
    ['ur', 'Urdu'],
    ['zh', 'Chinese'],
  ]);

  SOURCE_LANGUAGE: AllowedLanguage = 'en';

  categories: string[];
  context: string[];
  filterText = '';
  filterText2 = '';
  hideSourceLanguage: boolean;
  isLoggedIn = false; // Set to `true` to skip login when needed;
  loading = true;
  loginError = false;
  mainObject: TranslationItem[] = [];
  reviewedOnce: boolean;
  saveSuccessShowing = false;
  savingInProgress = false;
  selectedPage = 'none';
  viewType: ViewType = 'everything';
  waitingForServer = false;

  login: LoginInterface = {
    name: '',
    pass: '',
    language: undefined
  };

  languageOriginal: any;
  languageToTranslate: any;

  constructor(
    public fileService: FileService,
  ) { }

  /**
   * Get all data from fileService
   * only start app when all data is received
   */
  async getAllData() {

    [this.languageOriginal, this.languageToTranslate] = await Promise.all([
      this.fileService.getLanguageJSON(this.login.name, this.login.pass, this.SOURCE_LANGUAGE),
      this.fileService.getLanguageJSON(this.login.name, this.login.pass, this.login.language)
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

  toggleHideColumn(): void {
    this.hideSourceLanguage = !this.hideSourceLanguage;
    this.filterText = '';
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
  async saveEverything() {
    this.savingInProgress = true;
    const toSave: any = {};

    this.categories.forEach((category) => {
      toSave[category] = {};
    });

    this.mainObject.forEach((element) => {
      toSave[element.category][element.name] = element.editedText.replace('\n', '');
    });
    console.log('Saving data:');
    console.log(toSave);

    // TODO - strongly type:
    const res: any = await this.fileService.saveLanguageJSON(this.login.name, this.login.pass, this.login.language, toSave);

    console.log('response is here:');
    console.log(res);

    if (res.success) {
      // everything has been saved -- RESTART FROM SCRATCH !!!
      this.resetToInitial();
    } else {
      console.log('some error !!!');
    }

  }

  /**
   * Reset to inital state -- fetching newest saved data
   * ONLY DONE AFTER SAVE !!!
   */
  resetToInitial() {
    this.loading = true;
    this.reviewNow(); // reset everything
    this.reviewedOnce = false;
    this.viewType = 'everything';

    this.savingInProgress = false;
    this.saveSuccessShowing = true;

    setTimeout(() => {
      this.saveSuccessShowing = false;
    }, 2000);

    this.getAllData();
  }


  tryLogin() {
    if (this.login.name && this.login.pass) {
      this.waitingForServer = true;
      this.fileService.login(this.login).subscribe((data: ServerResponse) => {
        this.isLoggedIn = data.success;
        if (!data.success) {
          this.loginErrorNotify();
        } else {
          this.getAllData();
        }
      }, (err) => {
        this.loginErrorNotify();
      });
    }
  }

  /**
   * Perform animation that login failed
   * reset password
   * make fields editable again
   */
  loginErrorNotify(): void {
    this.login.pass = '';
    this.loginError = true;
    setTimeout(() => {
      this.loginError = false;
    }, 1000);
    this.waitingForServer = false;
  }

}

