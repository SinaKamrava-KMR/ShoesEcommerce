const navigation = document.querySelectorAll('.navigation span');


handelNavigationEvents()

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