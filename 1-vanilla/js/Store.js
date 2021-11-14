import { TabType } from './views/TabView.js';

const tag = '[Store]';

export default class Store {
  constructor(storage) {
    console.log(tag, 'constructor');

    if (!storage) throw 'no storage';

    this.storage = storage;

    this.searchKeyword = '';
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    // searchKeyword에 해당하는 상품 검색
    this.searchKeyword = keyword; // searchKeyword에 인자로 받은 키워드를 넣어줌
    this.searchResult = this.storage.productData.filter(product =>
      product.name.includes(keyword)
    ); // 실제 storage에 있는 데이터를 검색
  }
}
