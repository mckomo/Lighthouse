/*jslint browser: true, devel: true */

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

    var currentQuery = this.query.slice(0);

    if (currentQuery.length < 3) {
      return;
    }

    setTimeout(function() {

      if (currentQuery !== vm.query) {
        return;
      }

      var query = buildQuery();

      requestEndpoint(query).then(function(torrents){
        vm.torrents = torrents;
      });

    }, 350);

  }
}

function buildQuery() {

  var query = {q: vm.query, limit: 10};

  if (isSupportedCategory(vm.category)) {
    query.category = vm.category.toLowerCase();
  }

  return query;
}

function requestEndpoint(query) {
  return endpoint.getList(query);
}

function isSupportedCategory(category) {
  return categories.indexOf(category) >= 0;
}

export default MainController;
