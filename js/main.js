/* 

Vanilla Template

https://templatemo.com/tm-526-vanilla

*/

jQuery(document).ready(function($) {
	'use strict';
  let intervalId = 0;
  
  addSideNavScrolls();
  loadOwlCarousel();
  
  if (/*@cc_on!@*/false) { // check for Internet Explorer
    intervalId = displayIntroNouns();
    document.onfocusin = () => {
      clearInterval(intervalId);
      intervalId = displayIntroNouns();
    };
  } else {
    intervalId = displayIntroNouns();
    window.onfocus = () => {
      clearInterval(intervalId);
      intervalId = displayIntroNouns();
    };
  }
});

function addSideNavScrolls() {
  const fixedSideNavbarEl = document.getElementById('fixed-side-navbar');

  fixedSideNavbarEl.addEventListener('click', e => {
    const tabEl = e.target;

    scrollTo(tabEl.innerText.toLowerCase() || tabEl.href.slice(1));
  })
}

function scrollTo(elId) {
  const projectsSectionEl = document.getElementById(elId);

  return () => {
    const intervalId = setInterval(()=> {
      const projectsSectionY = projectsSectionEl.getBoundingClientRect().y;
      const dir = projectsSectionY < 0 ? -1 : 1
  
      if (projectsSectionY <= 0) {
        clearInterval(intervalId);
      } else {
        window.scroll({ top: window.scrollY + 30*dir })
      }
    }, 5);
  }

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

  return setInterval(() => {
    if (document.hasFocus() && elIsOnScreen(introNounsEl)) {

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
  const newWord = 'A' + word;
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
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}