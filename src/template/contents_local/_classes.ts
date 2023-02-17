import { regexQuerySafe, sliceAroundKeywords } from "./_helpers";

export class ArticleRecordsPack {
  // --------- FROM FrontHead Props
  array: Array<ArticleRecord>;
  constructor(articleList: Array<ArticleRecord>) {
    this.array = articleList;
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

  array: Array<ArticleRecord>;
  constructor(articleRecords: Array<ArticleRecord>) {
    this.array = articleRecords;
  }

  highlightKeyword(keyword: string) {
    if (this.array.length === 0) return;

    const querysafe = regexQuerySafe(keyword);
    const regex = new RegExp(querysafe, 'gi');
    const newArr: Array<ArticleRecord> = [];

    this.array.forEach((rawRecord) => {
      const newRecord = { ...rawRecord };
      newRecord.raw = rawRecord.raw.replace(
        regex,
        `<mark>${keyword}</mark>`
      );
      newArr.push(newRecord);
    })
    this.array = newArr;
  }

  sliceAroundKeyword(keyword: string, length: number) {
    if (this.array.length === 0) return;

    const querysafe = regexQuerySafe(keyword);
    const newArr: Array<ArticleRecord> = [];

    this.array.forEach((rawRecord) => {
      const newRecord = { ...rawRecord };

      const slicedString = sliceAroundKeywords(rawRecord, querysafe, length);
      newRecord.raw = slicedString;

      newArr.push(newRecord);
    })
    this.array = newArr;
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