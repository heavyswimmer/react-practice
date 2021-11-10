import { on, qs } from '../helpers.js'
import View from './View.js';

const tag = '[SearchFormView]';

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, 'constructor');
    
    super(qs('#search-form-view'));

    this.inputElement = qs('[type=text]', this.element);
    this.resetElement = qs('[type=reset]', this.element);

    this.showResetButton(false);
    this.bindEvents()
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? 'block' : 'none';
  }

  bindEvents() {  // 이벤트를 바인딩하는 메서드
    on(this.inputElement, 'keyup', () => this.handleKeyUp());
    this.on('submit', (event) => this.handleSubmit(event));
    on(this.resetElement, 'click', () => this.handleReset()); // resetElement에서 발생하는 click 이벤트를 바인딩

  }

  handleKeyUp() {
    // console.log(tag, 'handleKeyup', this.inputElement.value); // keyup 이벤트가 발생하는 지 확인
    const {value} = this.inputElement;  // 입력한 검색어를 value 객체 형태로 전달
    this.showResetButton(value.length > 0); // 0(입력값X)일 때는 X버튼 숨기고 1 이상(입력값 존재)이면 X버튼이 나타나게 함

    if (value.length <= 0) {  // 아무것도 입력하지 않았다면
      this.handleReset(); // 동일한 이벤트 발행
    } 
  }

  handleSubmit(event) { // 엔터를 입력하면 검색 결과가 보이도록 핸들링
    event.preventDefault(); // form의 default 설정인 submit 해제
    console.log(tag, 'handleSubmit');
    const {value} = this.inputElement; // 입력한 검색어를 value 객체 형태로 전달
    this.emit('@submit', {value});  // 이벤트를 외부(controller)에 알려줌
  }

  handleReset() {
    console.log(tag, 'handleReset');
    this.emit('@reset');
  }
}

