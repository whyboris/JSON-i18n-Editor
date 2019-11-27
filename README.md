# JSON i18n Editor

**JSON i18n Editor** helps you translate your JSON language files. It's an interface for you or your team to add and edit translations for your application or website.

<p align="center">
  <img width="800" alt="JSON-i18n-Editor" src="https://user-images.githubusercontent.com/17264277/69726280-31ae7880-10ee-11ea-886a-e57c0c8106bc.png">
</p>

## Features

- Shows three columns: original language, last-saved translation (if any), and editable text box.
- When you change the text in the editable box, you see the _diff_: any text you remove from the last-saved translation is highlighted in red and any text you add is highlighted in green.
- Original language and last-saved translation are independently searchable.
- You can view one category at a time; view only untranslated fields, or only those you currently modified.
- Clicking `REVIEW` shows only the text you have edited for a quick review.

## How to use

It *requires* two input `JSON` files (currently hardcoded as an example: `en.json` & `de.json`) each of which must have a depth of 2, for example:
```JSON
{
  "categoryName": {
    "keyName": "some text",
    "anotherKey": "some text",
    ...
  },
  "anotherCategory" :{
    "keyName": "some text",
    ...
  },
  ...
}
```
_The value of all the keys at depth 1 must always be objects containing only keys that have strings as values_

The structure of `en.json` is taken as authority on which keys must be present.

## Recommended workflow

1. Create the source-of-truth original `en.json` file
2. Use an [automated system](https://www.npmjs.com/package/translate-json-object) to translate all text into `de.json`
3. Use **JSON i18n Editor** to fix the automated translateion

## Technology

**JSON i18n Editor** is built with:
- [Angular](https://angular.io/)
- [ngx-virtual-scroller](https://github.com/rintoj/ngx-virtual-scroller)
- [Quill](https://github.com/quilljs/quill)


## Credits

Created for and used by [Health Impact Fund](https://healthimpactfund.org/)
