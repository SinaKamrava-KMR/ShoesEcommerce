
import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Product } from "../model/product.js";

const page = new Page()

const navigation = document.querySelectorAll('.navigation span');
const line = document.getElementById('line');
const activeState = document.getElementById('active-state');
const compliteState = document.getElementById('complite-state');


handelNavigationEvents()
initOrderState()

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
      const txt = item.querySelector('p').textContent.toLowerCase()
      changePageWithNavigation(txt)
      icons.forEach(icon => {
        icon.classList.toggle('hidden');
      })

    })
  });
}

function changePageWithNavigation(txt) {
  switch (txt) {
    case 'home':
      page.go('index');
      break;
      case 'card':
        page.go('cart');
      break;
      case 'orders':
        page.go('order');
        break;
  }
}

function initOrderState() {
  
  activeState.addEventListener("click", () => {

    activeState.classList.add('active-order-state')
    compliteState.classList.remove('active-order-state')
    line.style.transform = `translateX(0)`;

  })

  compliteState.addEventListener("click", () => {

    activeState.classList.remove('active-order-state')
    compliteState.classList.add('active-order-state')
    line.style.transform = `translateX(100%)`;

  })
}