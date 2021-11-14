import { delegate, qs, qsAll } from '../helpers.js';
import View from './View.js';

const tag = '[TabView]';

export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY',
};

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
};

export default class TabView extends View {
  constructor() {
    console.log(tag, 'constructor');
    super(qs('#tab-view'));
    this.template = new Template();
    // 생성 시점에 이벤트 바인딩 호출하는 함수
    this.bindEvents(); // li 엘리먼트에서 클릭 이벤트가 발생했을 때 처리하도록
  }

  bindEvents() {
    delegate(this.element, 'click', 'li', event => this.handleClick(event));
  }

  handleClick(event) {
    console.log(tag, event.target);
    const value = event.target.dataset.tab;
    this.emit('@change', { value });
  }

  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();

    qsAll('li', this.element).forEach(li => {
      li.className = li.dataset.tab === selectedTab ? 'active' : '';
    });

    super.show();
  }
}

class Template {
  // 추천검색어와 최근검색어가 포함된 리스트
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map(tabType => ({ tabType, tabLabel: TabLabel[tabType] }))
          .map(this._getTab)
          .join('')}
      </ul>
    `;
  }

  _getTab({ tabType, tabLabel }) {
    return `
      <li data-tab="${tabType}">
        ${tabLabel}
      </li>
    `;
  }
}
