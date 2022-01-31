/* 

Vanilla Template

https://templatemo.com/tm-526-vanilla

*/

jQuery(document).ready(function($) {
	'use strict';
  addSideNavScrollspy();
  addActionButtonSmoothScroll();
  loadOwlCarousel();
  displayIntroNouns();
});

function addSideNavScrollspy() {
  $('body').scrollspy({ 
    target: '.fixed-side-navbar',
    offset: 200
  });
}

function addActionButtonSmoothScroll() {
  const actionButtonEl = document.getElementById('action-button');
  const projectsSectionEl = document.getElementById('projects');

  actionButtonEl.addEventListener('click', () => {
    const intervalId = setInterval(()=> {
      const projectsSectionY = projectsSectionEl.getBoundingClientRect().y;

      if (projectsSectionY <= 0) {
        clearInterval(intervalId);
      } else {
        window.scroll({ top: window.scrollY + 30 })
      }
    }, 5);
  });
}

function loadOwlCarousel() {
  var owl = $("#owl-testimonials");

  owl.owlCarousel({
    
    pagination : true,
    paginationNumbers: false,
    autoPlay: 6000, //Set AutoPlay to 3 seconds
    items : 3, //10 items above 1000px browser width
    itemsDesktop : [1000,3], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,2], // betweem 900px and 601px
    itemsTablet: [600,1], //2 items between 600 and 0
    itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      
  });
}

function displayIntroNouns() {
  const introNounsEl = document.getElementById('intro-nouns');
  const typingInterval = 75;
  const nouns = [' Software Engineer', 'n Artist', ' Dog Dad'];
  let currIdx = 0;

  setInterval(() => {
    if (document.hasFocus() && elIsOnScreen(introNounsEl)) {
      console.log('in interval');
      
      deleteWord(introNounsEl);
      setTimeout(() => {
        currIdx = (currIdx + 1) % nouns.length;
        typeWord(introNounsEl, nouns[currIdx]);
      }, typingInterval * introNounsEl.innerText.length);
    }
  }, 5000);
}

function deleteWord(el) {
  const intervalId = setInterval(() => {
    const innerText = el.innerText;

    if (innerText.length === 1) {
      clearInterval(intervalId);
    } else {
      el.innerText = innerText.slice(0, innerText.length - 1);
    }
  }, 75)
}

function typeWord(el, word) {
  const newWord = el.innerText + word;
  let letterIdx = 1;

  const intervalId = setInterval(() => {
    if (letterIdx - 1 === newWord.length)
      clearInterval(intervalId);

    el.innerText = newWord.slice(0, letterIdx++);
  }, 150)
}

function elIsOnScreen(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}