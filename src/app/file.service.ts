import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface, AllowedLanguage } from './app.component';

const en: JSON = require('../assets/en.json');
const de: JSON = require('../assets/de.json');

export interface ServerResponse {
  success: boolean;
  error?: number;
}

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetch source language from server
   */
  public getSourceLanguage(language: AllowedLanguage) {

    const headers = new HttpHeaders()
      .set('secret', 'abcde')
      .set('language', language);

    return new Promise(resolve => {

      // resolve(en);

      this.http.get('http://temp.yboris.com/hif/get_latest.php', { headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  /**
   * Fetch language to translate from server
   */
  public getLanguageToTranslate(language: AllowedLanguage) {

    const headers = new HttpHeaders()
      .set('secret', 'abcde')
      .set('language', language);

    return new Promise(resolve => {

      // resolve(de);

      this.http.get('http://temp.yboris.com/hif/get_latest.php', { headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  public login(creds: LoginInterface) {

    const headers = new HttpHeaders()
      .set('name', creds.name)
      .set('password', creds.password);

    return this.http.get('http://temp.yboris.com/hif/login.php', { headers });
  }

}
