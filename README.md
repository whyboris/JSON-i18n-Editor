# APP NAME

This application is an interface for translating your application or website into a different language.

It is built with [Angular](https://angular.io/) utilizing [ngx-virtual-scroller](https://github.com/rintoj/ngx-virtual-scroller) and [Quill](https://github.com/quilljs/quill).

It *requires* two input `JSON` files (currently hardcoded as an example: `en.json` & `de.json`) each of which must be formatted thus:
```JSON
{
  "categoryName": {
    "keyName": "some text",
    ...
  },
  "anotherCategory" :{
    "keyName": "some text",
  }
}
```
The nesting cannot be shallower or deeper than this.

