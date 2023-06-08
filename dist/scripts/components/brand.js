import { Url } from "../utilities/url.js";
import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Product } from "../model/product.js";
const url = new Url();
const page = new Page();
const request = new Request('http://localhost:3000/');

const productsContainer = document.getElementById("products");
const back = document.getElementById('backbtn');

(() => {
 
  let txt = url.params('brand');
  document.getElementById('brandName').textContent = txt
  getFilteredProducts(txt)
})();






back.addEventListener('click', () => {
  page.go('index')
})




function getFilteredProducts(filter) {
  request.getByFilter('products', filter).then(result => {
    console.log(result);
    inserProducts(result)
  })
}

function inserProducts(list) {
  productsContainer.innerHTML = ''
  list.forEach(item => {
    productsContainer.innerHTML += generateHomeProduct(new Product(item))
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

window.handelProductClick = (e) => {
  let id = e.closest('.product').dataset?.id;
  console.log(id);
  page.go('product',{key:'id',value:id})
}