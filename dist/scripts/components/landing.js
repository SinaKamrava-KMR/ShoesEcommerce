import { Page } from "../utilities/page.js";
import { Catch } from "../utilities/catch.js";

const page = new Page();
const storage = new Catch();
(() => {

  if (storage.checkSplashstate()) {
    page.go('login')
  } else {
    storage.setSplashstate()
  }
  
})()


const spalsh = document.getElementById("splash");
const intro = document.getElementById("landing-intro");
const nextBtn = document.getElementById("next-btn");
const sliderPage = document.getElementById("slider-page");
const slides = document.querySelectorAll(".slider .slide");
const seprate = document.querySelector(".seprats-line");
const slideText = document.querySelector(".slide-text");

let count = 0;
const sliderTexts = ['We provide high quality products just for you', 'Your satisfaction is our number one periority', 'Let’s fulfill your fashion needs with shoearight now!'];


nextBtn.addEventListener('click', () => {

  count++;
  if (count > 2) {
    page.go('login');
    return;
  };
  if (count == 2) nextBtn.textContent = 'Get Started';
  slideImage()
  
});






startSplash()
initLoadingAnimation()



function slideImage() {
 
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${count * 100}%)`;
  });

  slideText.innerHTML = `<p class="animate-comeLeft">${sliderTexts[count]}</p>`
  
  switch (count) {
    case 0:
      seprate.style.left = `${0 * 100}%`
      break;
    case 1:
      seprate.style.left = `35%`
      break;
    case 2:
      seprate.style.left = `73%`
      break;
  }


}

function initSlider() {

  setTimeout(() => {
    sliderPage.classList.remove('hidden')
    sliderPage.classList.add('animate-fadeOut');
  }, 1000);


  
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;

  });

  seprate.style.left = `0%`;



}


function initLoadingAnimation() {
  bodymovin.loadAnimation({
    container: document.getElementById('loading-aniamtion'),
    
    path: '../../assets/animation/loading.json',
    
    renderer: 'svg',
    
    loop: true,
    
    autoplay: true,
    
    name: "Loading Animation",
    });  
}


function startSplash() {
  
  setTimeout(() => {
    spalsh.classList.add('animate-fadeIn');
    startIntro();
  }, 5000);

}

function startIntro() {
  setTimeout(() => {
    intro.classList.remove('hidden')
    spalsh.classList.add('hidden')
    intro.classList.add('animate-fadeOut');
    
  }, 1000);


  intro.addEventListener("click", () => {
    intro.classList.remove('animate-fadeOut')
    intro.classList.add('animate-fadeIn')
    initSlider()
    setTimeout(() => {
      intro.classList.add('hidden')
    }, 1000);
    
  })
}