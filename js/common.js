//// Header의 인풋창에서 돋보기를 눌렀을때 focus가 작동
const searchEl = document.querySelector('.search');
// const searchInp = document.querySelector('input') 중복으로 쓸 필요 X;
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
  // 속성추가
});
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 올해 몇년도?
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
