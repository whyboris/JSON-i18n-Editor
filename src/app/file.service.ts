import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const en: JSON = require('../assets/en.json');
const de: JSON = require('../assets/de.json');

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient,
  ) { }

  public get_en() {

    const headers = new HttpHeaders()
      .set('secret', 'abcde')
      .set('language', 'en');

    return new Promise(resolve => {

      resolve(en);

      // this.http.get('http://temp.yboris.com/hif/get_latest.php', { headers })
      //   .subscribe((data) => {
      //     resolve(data);
      //   });
    });
  }

  public get_de() {

    const headers = new HttpHeaders()
      .set('secret', 'abcde')
      .set('language', 'de');

    return new Promise(resolve => {

      resolve(de);

      // this.http.get('http://temp.yboris.com/hif/get_latest.php', { headers })
      //   .subscribe((data) => {
      //     resolve(data);
      //   });
    });
  }

}
