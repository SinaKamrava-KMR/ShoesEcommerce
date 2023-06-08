
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

initCategories()
handelNavigationEvents();
brandPage();

function initCategories() {
  
  categories.forEach(category => {
    category.addEventListener('click', () => {
      resetCategories()
      category.classList.add('active-category')
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
  brands.forEach(page => {
    page.addEventListener('click', () => {
      window.location =`http://127.0.0.1:5500/dist/pages/brand.html`
    })
  })
}

seeAllBtn.addEventListener('click', () => {
  window.location =`http://127.0.0.1:5500/dist/pages/popular.html`
})

products.forEach(product => {
  product.addEventListener("click", () => {
    window.location =`http://127.0.0.1:5500/dist/pages/product.html`
  })
})