import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginInterface } from './app.component';

import { AllowedLanguage } from './languages';

// const en: JSON = require('../assets/en.json');                                     // for testing
// const de: JSON = require('../assets/de.json');                                     // for testing

export interface ServerResponse {
  success: boolean;
  error?: number;
}

@Injectable()
export class FileService {

  API_URL = 'https://admin.healthimpactfund.org/translate/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetch source language from server
   */
  public getLanguageJSON(user: string, pass: string, language: AllowedLanguage) {

    // return language === 'en' ? en : de;                                            // for testing

    const headers = new HttpHeaders()
      .set('user', user)
      .set('pass', pass)
      .set('language', language);

    return new Promise(resolve => {
      this.http.get(this.API_URL + 'get_latest.php', { headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  public saveLanguageJSON(user: string, pass: string, language: AllowedLanguage, data: any) {

    const headers = new HttpHeaders()
      .set('user', user)
      .set('pass', pass)
      .set('language', language);

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'save_new.php', data, { headers })
        .subscribe((res) => {
          console.log('response came in');
          console.log(res);
          resolve(res);
        });
    });

  }

  public login(creds: LoginInterface) {

    const headers = new HttpHeaders()
      .set('user', creds.name)
      .set('pass', creds.pass)
      .set('language', creds.language);

    return this.http.get(this.API_URL + 'login.php', { headers });
  }

}
