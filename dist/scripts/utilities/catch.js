export class Catch{

  #getItem(key) {
    const store = localStorage.getItem(key) || '[]';
    return JSON.parse(store);
  }
  #setItem(key, value) {
    localStorage.setItem(key, JSON.stringify([value]));
  }


   checkSplashstate() {
    const state = this.#getItem('spalsh');
    return state?.[0] ? true : false;
  }

   setSplashstate() {
    this.#setItem('spalsh', 'on');
  }


  checkUser() {
    let list = this.#getItem('user');
    return list?.[0] ? true : false; 
  }

  getUser() {
    const list = this.#getItem('user');
    return list[0]
  }

  setUser(user) {
    this.#setItem('user', user);
  }

}