import { on } from "./helpers.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView}) {
    console.log(tag, 'constructor');
    this.store = store;

    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
    
  }

  subscribeViewEvents() {
    this.searchFormView.on('@submit', event =>
      this.search(event.detail.value)
    ).on('@reset', () => this.reset());
  }
  
  search(searchKeyword) {
    console.log(tag, 'search', searchKeyword);
  }

  // TODO
  // 검색 결과를 삭제해주는 메서드 생성
  reset() {
    console.log(tag, 'reset');
  }
}
