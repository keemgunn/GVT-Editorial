export class ArticleRecordsPack {
  // --------- FROM FrontHead Props
  array: Array<ArticleRecord>;
  constructor(articleList: Array<ArticleRecord>) {
    this.array = articleList
  }

  /** Set this pack with sorting condition */
  sortAsc(by: 'title' | 'uri' | 'date' | 'filename') {
    this.array.sort((a, b) => {
      if (a[by] < b[by]) return -1;
      if (a[by] > b[by]) return 1;
      return 0;
    })
  }

  /** Set this pack with sorting condition */
  sortDesc(by: 'title' | 'uri' | 'date' | 'filename') {
    this.array.sort((a, b) => {
      if (a[by] < b[by]) return 1;
      if (a[by] > b[by]) return -1;
      return 0;
    })
  }

  slice(start?: number, end?: number) {
    this.array = this.array.slice(start, end);
  }
}


export class ArticleRawRecordsPack {

  // TODO
}