function filterProjects(type, btn) {
  var buttons = document.getElementsByClassName('filter-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = 'filter-btn';
  }
  btn.className = 'filter-btn on';
  var projects = document.getElementsByClassName('project');
  var shown = 0;
  for (var j = 0; j < projects.length; j++) {
    var p = projects[j];
    var show = (type == 'all' || p.getAttribute('data-type') == type);
    p.style.display = show ? 'grid' : 'none';
    if (show) {
      p.className = (shown % 2 == 1) ? 'project reverse' : 'project';
      shown++;
    }
  }
  document.getElementById('empty').style.display = (shown == 0) ? 'block' : 'none';
}
window.onscroll = function () {
  var h = document.getElementById('header');
  h.className = (window.scrollY > 30) ? 'header scrolled' : 'header';
};
// 블로그 슬라이더 (Swiper)
var blogSwiper = new Swiper('#blog-track', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500
});
function moveBlog(dir) {
  if (dir < 0) blogSwiper.slidePrev();
  else blogSwiper.slideNext();
  var arrows = document.querySelectorAll('.blog .arrows .round');
  arrows[0].classList.toggle('on', dir < 0);
  arrows[1].classList.toggle('on', dir > 0);
}
function toggleMenu() {
  var menu = document.querySelector('.header .menu');
  var btn = document.querySelector('.header .menu-btn');
  menu.classList.toggle('open');
  btn.classList.toggle('on');
}
var menuLinks = document.querySelectorAll('.header .menu a');
for (var k = 0; k < menuLinks.length; k++) {
  menuLinks[k].onclick = function () {
    document.querySelector('.header .menu').classList.remove('open');
    document.querySelector('.header .menu-btn').classList.remove('on');
  };
}
function countText(el) {
  document.getElementById('count').innerHTML = el.value.length + '/500';
}
// 스크롤 애니메이션: [선택자, 방향, 시간차(ms)]
var aniList = [
  ['.hero .hero-grid > div:first-child > *', 'left', 120],
  ['.hero .hero-photo', 'up', 0],
  ['.about .about-text > *', 'left', 120],
  ['.about .about-photo', 'flip', 0],
  ['.about .info', 'up', 0],
  ['.skills .skills-text > *', 'left', 120],
  ['.skills .tool', 'up', 100],
  ['.portfolio .head-row', 'left', 0],
  ['.portfolio .project', 'up', 150],
  ['.blog .blog-text > *', 'left', 120],
  ['.blog .blog-track', 'fade', 0],
  ['.board .head-row > div > *', 'left', 120],
  ['.board .board-top', 'up', 0],
  ['.contact .contact-text > *', 'left', 120],
  ['.contact .contact-form', 'right', 0]
];
// 화면 아래쪽 10% 선을 넘어 들어오면 나타남
var showObserver = new IntersectionObserver(function (entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) entries[i].target.setAttribute('data-show', '');
  }
}, { rootMargin: '0px 0px -10% 0px' });
// 스크롤을 올려 화면 아래로 완전히 사라지면 처음 상태로 되돌림
var hideObserver = new IntersectionObserver(function (entries) {
  for (var i = 0; i < entries.length; i++) {
    if (!entries[i].isIntersecting && entries[i].boundingClientRect.top > 0) entries[i].target.removeAttribute('data-show');
  }
});
for (var a = 0; a < aniList.length; a++) {
  var aniEls = document.querySelectorAll(aniList[a][0]);
  for (var b = 0; b < aniEls.length; b++) {
    aniEls[b].setAttribute('data-ani', aniList[a][1]);
    if (aniList[a][2]) aniEls[b].style.transitionDelay = (b * aniList[a][2]) + 'ms';
    showObserver.observe(aniEls[b]);
    hideObserver.observe(aniEls[b]);
  }
}
