import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.css']
})
export class NetworkTableComponent implements OnInit, OnChanges {
  @Input('data') data: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
  }

  getColumnTitles() {
    let titles = [];
    for(let currentLetter in this.data) {
      this.data[currentLetter].forEach(nextLetter => {
        titles.push(nextLetter);
      });
    }
    return this.unique(titles);
  }

  getRowTitles() {
    let titles = [];
    for(let currentLetter in this.data) {
      titles.push(currentLetter);
    }
    return this.unique(titles);
  }

  getData(from: string) {
    let titles = this.getColumnTitles();
    let to = [];

    titles.forEach(letter => {
      let d = ' ';
      this.data[from].forEach(nextLetter => {
        if (letter === nextLetter) {
          d = '*';
        }
      });
      to.push(d);
    });

    return to;
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
