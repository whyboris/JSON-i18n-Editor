import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import Quill from 'quill';
import * as QuillRef from '../quill/quill';

import { HelperService } from '../quill/quill.service';

import { TranslationItem } from '../app.component';

import { defaultOptions } from '../quill/settings';

@Component({
  selector: 'app-row-component',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements AfterViewInit {

  @Input() item: TranslationItem;
  @Input() hideSourceLanguage: boolean;

  @ViewChild('editor1', { static: true }) editorNode1: ElementRef; // input file
  @ViewChild('editor2', { static: true }) editorNode2: ElementRef; // input file

  editor1: Quill;
  editor2: Quill;

  isModified = false;

  timeoutRef: any;

  keyBindings: any = {
    tab: {
      key: 9, // tab
      handler: () => { }
    },
    enter: {
      key: 13, // enter
      handler: () => { }
    },
  };

  constructor(
    public helperService: HelperService,
  ) { }

  ngAfterViewInit() {
    const customOptions = defaultOptions;
    customOptions.modules.keyboard.bindings = this.keyBindings;
    const readOnly = JSON.parse(JSON.stringify(defaultOptions));
    readOnly.readOnly = true;

    this.editor1 = new QuillRef.Quill(this.editorNode1.nativeElement, readOnly);
    this.editor2 = new QuillRef.Quill(this.editorNode2.nativeElement, defaultOptions);

    const newOps: any = {
      ops: [{
        insert: this.item.translation
      }]
    };
    this.editor1.setContents(newOps);

    const newOps2: any = {
      ops: [{
        insert: this.item.editedText
      }]
    };
    this.editor2.setContents(newOps2);

    if (this.item.translation !== this.item.editedText) {
      this.findDiff();
    }
  }


  /**
   * Generate the deletions/additions markup and render
   */
  findDiff() {
    // throttle it at least a bit!
    clearTimeout(this.timeoutRef);

    this.timeoutRef = setTimeout(() => {
      this.diffLogic();
    }, 150);
  }

  /**
   * Should only be accessed from `findDiff` (so it is throttled)
   */
  diffLogic() {
    const oldContent = this.editor1.getContents();
    const newContent = this.editor2.getContents();

    const location: number = (this.editor2.getSelection() || { index: null }).index;

    const deleteOnly = this.helperService.find_deletions(oldContent, newContent);
    const addOnly = this.helperService.find_additions(oldContent, newContent);

    this.editor1.setContents(deleteOnly);
    this.editor2.setContents(addOnly);

    if (location) {
      this.editor2.setSelection(location, 0);
    }

    const newText: string = this.helperService.deltasToPlaintext(this.editor2.getContents());
    this.item.editedText = newText;

    if (this.item.editedText !== this.item.translation) {
      this.isModified = true;
    } else {
      this.isModified = false;
    }
  }

}
