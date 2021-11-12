import { qs } from '../helpers.js';
import View from './View.js';

export default class SearchResultView extends View {
  constructor() {
    super(qs('#search-result-view')); // this의 element에 저장됨

    this.template = new Template(); // DOM을 만드는 용도의 template 객체 생성
  }

  show(data = []) {
    // controller를 통해서 show가 호출되면 검색된 상품데이터가 파라미터로 들어옴
    this.element.innerHTML =
      data.length > 0 // 데이터가 있으면
        ? this.template.getList(data) // 검색결과 리스트를 호출
        : this.template.getEmptyMessage(); // 검색결과가 없을 때 메시지 호출
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">검색결과가 없습니다.</div>
    `;
  }

  getList(data = []) {
    return `
      <ul class="result">
        ${data.map(this._getItem).join('')}
      </ul>
    `;
  }

  _getItem({ imageUrl, name }) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `;
  }
}
