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
      icons.forEach(icon => {
        icon.classList.toggle('hidden');
      })
    })
  });
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