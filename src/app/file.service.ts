import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface } from './app.component';

const en: JSON = require('../assets/en.json');
const de: JSON = require('../assets/de.json');

interface ServerResponse {
  success: boolean;
  error?: number;
}

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

  public login(creds: LoginInterface) {

    const headers = new HttpHeaders()
      .set('name', creds.name)
      .set('password', creds.password);

    return new Promise<boolean>(resolve => {

      this.http.get('http://temp.yboris.com/hif/login.php', { headers })
        .subscribe((data: ServerResponse) => {
          console.log('data');
          console.log(data);
          resolve(data.success);
        });
    });
  }

}
