

const slider = document.getElementById('product-slider');
const slides = document.querySelectorAll('.product-slide');
const pagination = document.querySelector('.pagination');
const colors = document.querySelectorAll('#colors span i');
const sizes = document.querySelectorAll('#sizes span');
const back = document.getElementById('backbtn');
const like = document.getElementById('like-btn');
const qntDec = document.getElementById('qnt-dec');
const qntInc = document.getElementById('qnt-inc');
const qntTxt = document.getElementById('Quantity-text');

let slidePosition = 0;
let qntCount = 1;
slides.forEach((slide, index) => {
  slide.style.left = `${(index) * 100}%`
});
initPagiantion(slides.length);
handelPagination(slidePosition);

let sliderWidth = slider.getClientRects()[0].width
touchHandel()
mouseHandel()
initColors()
initSizes()

back.addEventListener("click", () => {
  window.location =`http://127.0.0.1:5500/dist/pages/index.html`
});

qntDec.addEventListener('click', () => {
  
  if (qntCount < 1) return;
  qntCount--;
  qntTxt.textContent = qntCount;
})

qntInc.addEventListener('click', () => {
  qntCount++;
  qntTxt.textContent = qntCount;
})

like.addEventListener("click", () => {
  if (like.classList.contains('active-like')) {
    like.innerHTML = `<i class="bi bi-heart text-xl"></i>`
    like.classList.remove('active-like')
  } else {
    like.classList.add('active-like')
    like.innerHTML =`<i class="bi bi-heart-fill"></i>`
    
  }
})

function touchHandel() {
  let xUp, xDown;
  
  slider.addEventListener('touchstart', function (e) {

    let touch = e?.touches[0] || e?.changedTouches[0];
    xUp = touch.pageX;
    

  });
  slider.addEventListener('touchend', (e) => {

    let touch = e?.touches[0] || e?.changedTouches[0];
    xDown = touch.pageX;
   
    let result = xDown - xUp;
    
    
    if (result < sliderWidth / 2) {
      slidePosition++;
      slideImage()
    } else {
      slidePosition--;
      slideImage()
    }

  });
}

function mouseHandel() {
  let xUp, xDown;
  slider.addEventListener('mousedown', function (e) {
    xDown = e.offsetX;

  });
  slider.addEventListener('mouseup', (e) => {
    xUp = e.offsetX;

    let result = xDown - xUp;
    console.log(result,sliderWidth);
    
    if (result > sliderWidth/2) {
      slidePosition++;
      slideImage()
    } else {
      slidePosition--;
      slideImage()
    }

  });
}

function slideImage() {
  if (slidePosition >= slides.length) {
    slidePosition = slides.length - 1;
    return
  };
  if (slidePosition <0) {
    slidePosition = 0;
    return
  };
  handelPagination(slidePosition);
  slides.forEach((slide) => {
    
    slide.style.transform = `translateX(-${(slidePosition) * 100}%) translateY(-50%)`;
  });

 


}

function initPagiantion(count) {
  for (let i = 0; i < count;i++) {
   pagination.innerHTML +=`<span></span>`
  }
}

function handelPagination(index) {
  let spans = pagination.querySelectorAll('span');
  spans.forEach(span => {
    span.classList.remove('active-page');
  })

  spans.forEach((span,idx) => {
    if (idx == index) {
      span.classList.add('active-page');
    }
  })
}

function resetColors() {
  colors.forEach(icon => {
    icon.classList.add('invisible')
  })
}

function initColors() {
  colors.forEach(icon => {
    icon.closest('span').addEventListener('click', () => {
      resetColors()
      icon.classList.remove('invisible')
    })
  })
}

function resetSizes() {
  sizes.forEach(circle => {
    circle.classList.remove('active-size')
  });
}

function initSizes() {
  sizes.forEach(circle => {
    circle.addEventListener("click", () => {
      resetSizes()
      circle.classList.add('active-size')
    })
  });
}