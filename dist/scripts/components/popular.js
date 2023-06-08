
const categories = document.querySelectorAll('.categories .category');
const back = document.getElementById('backbtn');

initCategories()


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

back.addEventListener('click', () => {
  window.location =`http://127.0.0.1:5500/dist/pages/index.html`
})