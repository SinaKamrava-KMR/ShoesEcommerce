import { Url } from "../utilities/url.js";
import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Product } from "../model/product.js";
import { Order } from "../model/order.js";
import { Catch } from "../utilities/catch.js";

const url = new Url();
const page = new Page();
const request = new Request('http://localhost:3000/');
const storage = new Catch()

const slidesWrapper =document.getElementById('slides-wrapper')
const slider = document.getElementById('product-slider');
const pagination = document.querySelector('.pagination');
const colors = document.getElementById('colors');
const back = document.getElementById('backbtn');
const like = document.getElementById('like-btn');
const qntDec = document.getElementById('qnt-dec');
const qntInc = document.getElementById('qnt-inc');
const qntTxt = document.getElementById('Quantity-text');
const productTitle = document.getElementById('product-title');
const productSold = document.getElementById('product-sold');
const productRate = document.getElementById('product-rate');
const productReviews = document.getElementById('product-reviews');
const productDescription = document.getElementById('product-description');
const productTotalPrice = document.getElementById('product-totalPrice');
const buyBtn = document.getElementById('buyBtn');

let slidePosition = 0;
let qntCount = 1;
let productId = url.params('id');
let productObj = [];
(() => {
 
  getProductByID(productId);
})();


let chooseColor = '';
let chooseSize = '';
let sliderWidth = slider.getClientRects()[0].width
touchHandel()
mouseHandel()


back.addEventListener("click", () => {
  page.go('index')
});

qntDec.addEventListener('click', () => {
  
  qntCount--;
  if (qntCount < 1) {
    qntCount = 1;
    return;
  };
  productTotalPrice.textContent = (productObj.price * qntCount).toFixed(2)
  qntTxt.textContent = qntCount;
})

qntInc.addEventListener('click', () => {
  qntCount++;
  productTotalPrice.textContent = (productObj.price * qntCount).toFixed(2)
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


buyBtn.addEventListener("click", () => {

  let userId = storage.getUser().id;
  // console.log(productObj);
  const cart = {
    id:'',
    userId:userId,
    productId:productId,
    color:chooseColor,
    size: chooseSize,
    image: productObj.images[0],
    status:"non-active",
    count:qntCount,
    title:productTitle.textContent,
    price:productObj.price,
    totalPrice:(parseFloat(productTotalPrice.textContent)*qntCount).toFixed(2),
    paymentMethod:'',
    shippingAddress:''
  }

  request.post('orders', cart).then(result => {
    // console.log(result);
    // page.go('cart')
    buyBtn.innerHTML = "added successfully"
    setTimeout(() => {
      buyBtn.innerHTML = `<i class="bi bi-bag-check-fill"></i>
      <p>Add to cart</p>`
    }, 2000);

  }).catch(error => {
    console.log(error);
  })

  // console.log(cart);

  
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
  let slides=document.querySelectorAll('.product-slide')
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
  let colorsElm = colors.children;
  
  Array.from(colorsElm).forEach(span => {
    span.firstElementChild.classList.add('invisible')
  })
}

function initColors(list) {
 
  list.forEach((color, index) => {
    index == 0 ? chooseColor = color : '';
    colors.innerHTML += `<span data-color="${color}" onclick="handelColorClick(this)" class="text-xl cursor-pointer rounded-full px-2 py-1 bg-${color}-300">
    <i class="bi bi-check2 ${index==0?'':'invisible'}"></i>
    </span>`
  })

}

function resetSizes() {
  const sizes = document.getElementById('sizes').children
  Array.from(sizes).forEach(circle => {
    circle.classList.remove('active-size')
  });
}


function getProductByID(id) {
  request.getById('products', id).then(result => {
    console.log(result[0]);
    productObj = new Product(result[0])
    insertData(productObj);
   
  })

}

function insertData(product) {
  productTitle.textContent = product.title;
  productSold.textContent = product.soldNumbers;
  productRate.textContent = product.rate;
  productReviews.textContent = product.viewers;
  productDescription.textContent = product.description;
  productTotalPrice.textContent = product.price;
  initColors(product.colors)
  initProductSizes(product.sizes)
  generateSliderImage(product.images);


}

function generateSliderImage(images) {
  initPagiantion(images.length);
  slidesWrapper.innerHTML =''
  images.forEach(image => {
    slidesWrapper.innerHTML += imgMaker(image)
  });

  let items = slidesWrapper.children;

  Array.from(items).forEach((slide, index) => {
    slide.style.left = `${(index) * 100}%`
  });

  handelPagination(slidePosition);
}

function imgMaker(address) {
  return `          <div class="product-slide">
  <div  class="w-[250px] h-[250px]">
    <img draggable="false"  class="w-full h-full " src="${address}">
  </div>
</div>`
}

function initProductSizes(list) {
  const sizes = document.getElementById('sizes');
  sizes.innerHTML = '';
  list.forEach((size, index) => {
    index == 0 ? chooseSize = size : '';
    sizes.innerHTML += `<span onclick="handelSizeClick(this)" class="border border-dark-txt rounded-full px-2 py-1 cursor-pointer ${index==0?'active-size':''}">${size}</span>`
  })
}

window.handelSizeClick = (elm) => {
  chooseSize = elm.textContent;
  resetSizes()
  elm.classList.add('active-size');
 
}
window.handelColorClick = (elm) => {
  chooseColor = elm.closest("span").dataset?.color;
  let icon = elm.closest("span").firstElementChild;
  // console.log(icon);
  resetColors()
  icon.classList.remove('invisible')
  
 
}
