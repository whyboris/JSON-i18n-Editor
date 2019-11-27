import { Injectable } from '@angular/core';

const en: JSON = require('../assets/en.json');
const de: JSON = require('../assets/de.json');

@Injectable()
export class FileService {

  constructor() { }

  public get_en(): JSON {
    return en;
  }

  public get_de(): JSON {
    return de;
  }

}
