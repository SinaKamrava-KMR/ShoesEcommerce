

import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Catch } from "../utilities/catch.js";
import { Product } from "../model/product.js";

const page = new Page();
const storage = new Catch();
const request = new Request('http://localhost:3000/');

let userWishlist = [];
let productUser;
(() => {

  start()

})();

const categories = document.querySelectorAll('.categories .category');
const back = document.getElementById('backbtn');
const productsContainer = document.getElementById("products");
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener("click", () => {
  page.go('search',{key:'page',value:'wishlist'})
})

initCategories()

function start() {
  let userId = storage.getUser().id;
  console.log(userId);
  request.getById('users', userId).then(result => {
    productUser = result[0];
    getWishlists(productUser.wishlists)
  })
}

function initCategories() {
  
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      resetCategories()
      category.classList.add('active-category')
      let txt = e.target.closest('span').firstElementChild.textContent;
      if (txt == "All") {
        insertData(userWishlist)
      } else {
        filterProducts(txt)
      }
    })
  })

}

function resetCategories() {
  categories.forEach(category => {
    category.classList.remove('active-category')
  })
}

back.addEventListener('click', () => {
  page.go('index')
})

function getWishlists(IDList) {
  request.getQueues("products", IDList).then(result => {
    console.log(result);
    userWishlist = result;
    insertData(result);
  })
}

function generateCard(product) {
  return `<div data-id="${product.id}" onclick="handelProductClick(this)" class="product h-fit w-full">
  <div class="bg-gray-100 rounded-md flex items-center justify-center">
    <div class="w-[120px] h-[120px] md:w-[170px] md:h-[170px]  overflow-hidden">
      <img class="w-full h-full object-cover" src="${product.images[0]}">
    </div>
  </div>
  <p class="text-ellipsis font-semibold line-clamp-1 text-dark-txt">${product.title}</p>
  <div class="flex gap-2 items-center">

    <i class="bi bi-star-half"></i>
    <p id="product-rate">${product.rate}</p>
    <span class="text-sm bg-gray-100 flex items-center gap-2 py-1 rounded-sm px-2 text-slate-700"><p id="product-sold">${product.soldNumbers}</p> sold</span>
    
  </div>
  <p class="text-sm text-dark-txt md:text-base">$${product.price}</p>

  <span onclick="window.event.cancelBubble = true,handelWishlistLikeBtn(this)" class="absolute top-2 pt-1 cursor-pointer right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-lg flex items-center justify-center"><i class="bi bi-heart-fill"></i></span>
</div>`
}

function insertData(list) {
  productsContainer.innerHTML=''
  list.forEach(item => {
    productsContainer.innerHTML +=generateCard(new Product(item))
  })
}

window.handelProductClick = (e) => {
  // console.log(e);
  page.go('product',{key:'id',value:e.dataset?.id})
}

window.handelWishlistLikeBtn = (e) => {
  let cardId = e.closest('.product').dataset?.id;
  productUser.wishlists.forEach((id,index) => {
    if (cardId == id) {
      productUser.wishlists.splice(index, 1);
      updateUser();
    }
  })

}

function updateUser() {
  const user = { ...productUser };
  request.update('users',user).then(result => {
    insertData(productUser.wishlists)
  })
}

function filterProducts(filter='') {
  productsContainer.innerHTML = ''
  console.log(filter);
  userWishlist.forEach(item => {
  
    if (item.brand == filter.toLowerCase()) {
      productsContainer.innerHTML += generateCard(new Product(item))
    }
  })
}
// function getFilteredProducts(filter) {
//   request.getByFilter('products', filter).then(result => {
//     console.log(result);
//     inserProducts(result)
//   })
// }

// function inserProducts(list) {
//   productsContainer.innerHTML = ''
//   list.forEach(item => {
//     productsContainer.innerHTML += generateHomeProduct(new Product(item))
//   })
// }

// function generateHomeProduct(product) {

//   return `<div data-id="${product.id}" onclick="handelProductClick(this)"     class="product">
//       <div class="bg-gray-100 rounded-md flex items-center justify-center">
//         <div class="w-[120px] h-[120px] md:w-[170px] md:h-[170px]  overflow-hidden">
//           <img class="w-full h-full object-cover" src="${product.images[0]}">
//         </div>
//       </div>
//       <p class="text-ellipsis font-semibold line-clamp-1 text-dark-txt">
//       ${product.title}</p>

//       <p class="text-sm text-dark-txt md:text-base">$ ${product.price}</p>

//     </div>`
// }

// window.handelProductClick = (e) => {
//   let id = e.closest('.product').dataset?.id;
//   console.log(id);
//   page.go('product',{key:'id',value:id})
// }

// function getProducts() {
//   request.get('products').then(result => {
//     console.log(result);
//     inserProducts(result)
//   })
// }