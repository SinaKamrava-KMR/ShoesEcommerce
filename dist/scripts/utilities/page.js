export class Page{

  constructor() {
    this.basePage = 'http://127.0.0.1:5500/dist/pages/'
  }

  go(page,path='') {
    window.location = `${this.basePage}${path == '' ? '' : path}${page}.html`;
  }

}