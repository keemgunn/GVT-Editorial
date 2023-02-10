export class ArticleRecordsPack {
  // --------- FROM FrontHead Props
  array: Array<ArticleRecord>;
  constructor(articleList: Array<ArticleRecord>) {
    this.array = articleList
  }



  /** Get a new filtered pack */
  getOnlyHighlighted(state: ArticleHighlightState) {
    const newArr = this.array.filter((props) => props.highlighted === state);
    return new ArticleRecordsPack(newArr)
  }

  /** Get a new sorted pack */
  getSortedAsc(by: 'title' | 'uri' | 'date' | 'filename') {
    const newArr = this.array.sort((a, b) => {
      if (a[by] < b[by]) return -1;
      if (a[by] > b[by]) return 1;
      return 0;
    })
    return new ArticleRecordsPack(newArr)
  }

  /** Get a new sorted pack */
  getSortedDesc(by: 'title' | 'uri' | 'date' | 'filename') {
    const newArr = this.array.sort((a, b) => {
      if (a[by] < b[by]) return 1;
      if (a[by] > b[by]) return -1;
      return 0;
    })
    return new ArticleRecordsPack(newArr)
  }

  getSliced(start?: number, end?: number) {
    const newArr = this.array.slice(start, end);
    return new ArticleRecordsPack(newArr)
  }



  /** Set this pack with highlight filter */
  filterOnlyHighlighted(state: ArticleHighlightState) {
    this.array = this.array.filter((props) => props.highlighted === state);
  }

  slice(start?: number, end?: number) {
    this.array = this.array.slice(start, end);
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



  


}
