var endpoint;
var vm;

var categories = ['Movies', 'Applications', 'Music', 'XXX', 'Games'];

class MainController {

  constructor (Restangular) {

    vm = this;
    endpoint = Restangular.all('torrents');

    this.query = '';
    this.category = 'All';
    this.categories = categories;
    this.torrents =  [];
  }

  search() {

    if (this.query.length < 3) {
      return; 
    }

    var query = {q: this.query, limit: 10};

    if (isSupportedCategory(this.category)) { 
      query.category = this.category.toLowerCase(); 
    }

    endpoint
      .getList(query)
      .then(function(torrents){
      	vm.torrents = torrents;
      });

  }
}

function isSupportedCategory(category) {
  return categories.indexOf(category) >= 0;
}

export default MainController;
