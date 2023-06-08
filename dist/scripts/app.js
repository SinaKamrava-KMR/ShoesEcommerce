import { Request } from "./services/request.js";
import { Page } from "./utilities/page.js";
import { Product } from "./model/product.js";

const page = new Page()
const request = new Request('http://localhost:3000/')
const productsContainer = document.getElementById("products");
const searchWrapper = document.getElementById('search-wrapper');
const header = document.getElementById('header');
const navigation = document.querySelectorAll('.navigation span');
const categories = document.querySelectorAll('.categories .category');
const brands = document.querySelectorAll('.brands .brand');
const seeAllBtn = document.getElementById('seeAllBtn');
const products = document.querySelectorAll('.products .product')
let headerPosition = 0;
addEventListener("scroll", (event) => {

  headerPosition = header.getBoundingClientRect().top;
  if (headerPosition<0) {
    searchWrapper.style.position = `fixed`;
    searchWrapper.style.top = `3px`;
    searchWrapper.style.left = `4px`;
    searchWrapper.style.right = `4px`;
  } else {
       
        searchWrapper.style.position = null;
        searchWrapper.style.top = null;
  }   

});

getProducts()
initCategories()
handelNavigationEvents();
brandPage();

function initCategories() {
  
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      resetCategories()
      category.classList.add('active-category')
      let txt = e.target.closest('span').firstElementChild.textContent;
      if (txt == "All") {
        getProducts()
      } else {
        getFilteredProducts(txt)
      }
    })
  })

}

function resetCategories() {
  categories.forEach(category => {
    category.classList.remove('active-category')
  })
}

function resetNav() {

  navigation.forEach(item => {

    const icons = item.querySelectorAll('i');
    icons.forEach(icon => {
      if (icon.classList.contains('active-mode')) {
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
 
    })

  });
}

function handelNavigationEvents() {
  navigation.forEach(item => {
    item.addEventListener('click', () => {
      resetNav()
      const icons = item.querySelectorAll('i');
      icons.forEach(icon => {
        icon.classList.toggle('hidden');
      })
    })
  });
}

function brandPage() {
  brands.forEach(brand => {
    brand.addEventListener('click', (e) => {
      let txt = e.target.closest('.brand').lastElementChild.textContent;
      page.go('brand',{key:'brand',value:txt})
    })
  })
}

seeAllBtn.addEventListener('click', () => {
  page.go('popular')
})

// products.forEach(product => {
//   product.addEventListener("click", () => {
   
//   })
// })


function getProducts() {
  request.get('products').then(result => {
    console.log(result);
    inserProducts(result)
  })
}
function getFilteredProducts(filter) {
  request.getByFilter('products', filter).then(result => {
    console.log(result);
    inserProducts(result)
  })
}


function generateHomeProduct(product) {

    return `<div data-id="${product.id}" onclick="handelProductClick(this)"     class="product">
        <div class="bg-gray-100 rounded-md flex items-center justify-center">
          <div class="w-[120px] h-[120px] md:w-[170px] md:h-[170px]  overflow-hidden">
            <img class="w-full h-full object-cover" src="${product.images[0]}">
          </div>
        </div>
        <p class="text-ellipsis font-semibold line-clamp-1 text-dark-txt">
        ${product.title}</p>

        <p class="text-sm text-dark-txt md:text-base">$ ${product.price}</p>

      </div>`
}

function inserProducts(list) {
  productsContainer.innerHTML=''
  list.forEach(item => {
    productsContainer.innerHTML +=generateHomeProduct(new Product(item))
  })
}

window.handelProductClick = (e) => {
  let id = e.closest('.product').dataset?.id;
  console.log(id);
  page.go('product',{key:'id',value:id})
}