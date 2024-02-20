////스크롤 내리면 badge사라지게
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener(
  'scroll',
  _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      // gsap.to(요소,지속시간,옵션);
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: 'none',
        // opacity만 조정하면 그냥 안보이게만 하는거고 요소는 없어지지 않으므로
      });
      // 배지가 숨겨지고나서 TOP버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 배지 보여주기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: 'block',
      });
      // TOP버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
);
// _.throttle(함수, 시간)

// top버튼 누르면 최상단으로
toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

// visual영역 애니메이션
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소,지속시간,옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7 /* index는 0부터 시작하니까 0 에 무엇을 곱하든 0 */,
    opacity: 1,
  });
});
// index는 반복되는 횟수, 애니메이션을 1초동안 바꿔가면서 각각 실행할 것인데 그것이
// delay(0.7, 1.4, 2.1)초 뒤에 순차적으로

// 공지사항swiper
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
  // 마지막 슬라이드 다음에 바로 첫번째 슬라이드 반복
});
// new는 생성자(클래스)

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3 /* 한번에 보여줄 슬라이드 */,
  spaceBeween: 10 /* 슬라이드 사이 여백 */,
  centeredSlides: true /* 1번 슬라이드가 가운데 */,
  loop: true,
  autoplay: {
    delay: 5000 /* 5초에 한번씩 변경 */,
  },
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion  .swiper-next',
  },
});

// AWARDS
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBeween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  },
});

// 스타벅스 프로모션
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false;
// .promotion이 숨겨져있니? 아니니까(처음부터 보이니까) false로 하고 let을 쓴 이유는 나중에 true로 바뀔수 있으니

promotionToggleBtn.addEventListener('click', function () {
  // .promotion부분을 보여주거나 숨겨주는 함수
  isHidePromotion = !isHidePromotion;
  // true이면 false, false이면 true(지속적으로 반대값으로 반환)
  if (isHidePromotion) {
    // 처음값이 true 이면(숨김 처리)
    //if(true)이니까 다음 함수 실행
    promotionEl.classList.add('hide');
  } else {
    // 보임처리
    // 한번 돌고 다시 왔을떄 if(false)이니까 다음 함수 실행
    promotionEl.classList.remove('hide');
  }
});

// 애니메이션
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
// floating animation
function floatingObject(selector, delay, size) {
  // gsap.to(요소,시간,옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1 /* 무한반복 */,
    yoyo: true,
    // 위아래 반복
    ease: Power1.easeInOut,
    delay: random(0, delay),
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

// SCROLL MAGIC
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl,
    // trigger는 강제로 무엇인가를 실행, 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8,
    // 뷰포트 맨 상단이 0이고 맨하단이 1이니까 0.8부분이 지나는 순간 show라는 클래스를 부여
  })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});
