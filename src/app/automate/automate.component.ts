import { Component, OnInit } from '@angular/core';
import { Vis, DataSet } from 'vis';

@Component({
  selector: 'app-automate',
  templateUrl: './automate.component.html',
  styleUrls: ['./automate.component.css']
})
export class AutomateComponent implements OnInit {

  data: any;
  words = [];
  letters: {};

  constructor() {
    this.words.push({ value: 'dent', selected: true });
    this.words.push({ value: 'dentier', selected: true });
    this.words.push({ value: 'dentiste', selected: true });
    this.words.push({ value: 'chien', selected: true });
    this.words.push({ value: 'chiendent', selected: true });
    this.words.push({ value: 'canide', selected: true });
  }

  ngOnInit() {
    this.prepare();
  }

  onSelect(w) {
    let word = this.words.find((word) => word.value === w.value);
    if (word) {
      word.selected = !word.selected;
      this.prepare();
    }
  }

  onEnter(word) {
    this.words.push({ value: word, selected: true });
    this.prepare();
  }

  prepare() {
    console.log('dict ' + JSON.stringify(this.words));

    this.prepareLetters();
    this.prepareData();
  }

  prepareLetters() {
    this.letters = {};

    this.words.forEach((word) => {
      if (word.selected) {
        let lastLetter = null;
        for (let i = 0; i < word.value.length; i++) {
          const letter = word.value.charAt(i);
          if (lastLetter) {
            const table = this.letters[lastLetter] ? this.letters[lastLetter] : [];
            table.push(letter);
            this.letters[lastLetter] = this.unique(table);
          }
          lastLetter = letter;
        }
      }
    });

    console.log('letters ' + JSON.stringify(this.letters));
  }

  prepareData() {
    let nodes = [];
    let transitions = [];

    // first states
    this.words.forEach((word) => {
      if (word.selected) {
        const firstLetter = word.value.charAt(0);

        if (!nodes[firstLetter]) {
          nodes[firstLetter] = firstLetter;
          transitions.push({ name: firstLetter, from: 'Start', to: nodes[firstLetter] });
        }
      }
    });

    // middle states
    for(let currentLetter in this.letters) {
      this.letters[currentLetter].forEach(nextLetter => {
        if (!nodes[nextLetter]) {
          nodes[nextLetter] = nextLetter;
        }
      });
    }

    for(let currentLetter in this.letters) {
      this.letters[currentLetter].forEach(nextLetter => {
        // final state
        if (!this.letters.hasOwnProperty(nextLetter)) {
          transitions.push({ name: nextLetter, from: nodes[currentLetter], to: 'End'});
        } else {
          transitions.push({ name: nextLetter, from: nodes[currentLetter], to: nodes[nextLetter]});
        }
      });
    }

    this.data = {
      init: 'Start',
      transitions: transitions
    };

    console.log('data: ' + JSON.stringify(this.data));
  }

  unique(source) {
    let length = source.length, result = [], seen = new Set();
    for (let index = 0; index < length; index++) {
      let value = source[index];
      if (seen.has(value)) continue;
      seen.add(value);
      result.push(value);
    }
    return result;
  }


}
