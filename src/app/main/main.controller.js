/*jslint browser: true, devel: true */

var endpoint;
var vm;
var scope;
var timeout;
var location;

var categories = ['Anime','Applications', 'Books', 'Games', 'Movies', 'Music', 'Other', 'TV', 'XXX'];
var sortableFields = {
  size: {label: 'Size'},
  seedCount: {label: 'Seeds'},
  peerCount: {label:'Peers'},
  uploadedAt: {label: 'Upload date'}
};

class MainController {

  constructor (Restangular, $scope, $timeout, $location) {

    vm = this;
    scope = $scope;
    timeout = $timeout;
    location = $location
    endpoint = Restangular.all('torrents');


    this.query =  angular.extend({
      phrase: '',
      category: 'All',
      sortBy: null,
      sortOrder: null,
    }, location.search());

    this.categories = categories;
    this.sortableFields = sortableFields;
    this.torrents =  [];
    this.isSearching = false;

    $scope.$watch('main.query', function(newQuery) {

      var currentQuery = angular.copy(newQuery); // new object is required
      vm.isSearching = true;

      waitForUserInput(350, function() {

        var isQueryUnchanged = angular.equals(currentQuery, vm.query);

        if (isQueryUnchanged) {
          updateUrl(currentQuery)
          search(currentQuery);
        }

      });

    }, true);

  }

  toggleSort(field) {

    var isSortFieldChanged = this.query.sortBy !== field;
    var isOrderDesc = this.query.sortOrder === 'desc';
    var isOrderAsc = this.query.sortOrder === 'asc';

    if (isSortFieldChanged) {
      sortBy(field);
      return;
    }

    if (isOrderAsc) {
      sortBy(null);
      return;
    }

    if (isOrderDesc) {
      vm.query.sortOrder = 'asc';
    }

  }
}

function sortBy(field) {

  var isFieldNull = field === null;

  vm.query.sortBy = field;
  vm.query.sortOrder =  isFieldNull ? null : 'desc';

}


function search(query) {

  if (query.phrase.length < 3) {
    return;
  }

  var endpointQuery = buildEndpointQuery(query);

  requestEndpoint(endpointQuery).then(function(torrents ){
    vm.torrents = torrents;
  }).then(function() {
    vm.isSearching = false;
  });

  updateUrl(query);

}

function updateUrl(currentQuery) {
    location.search(currentQuery);
}

function waitForUserInput(timeMs, callback) {
  timeout(callback, timeMs);
}

function buildEndpointQuery(queryParams) {

  var query = {q: queryParams.phrase, limit: 100};

  if (isSupportedCategory(queryParams.category)) {
    query.category = queryParams.category;
  }

  if (isSortableField(queryParams.sortBy)) {
    query.sort_by = queryParams.sortBy;
  }

  if (queryParams.sortOrder !== null) {
    query.sort_order = queryParams.sortOrder;
  }

  return query;
}

function requestEndpoint(query) {
  return endpoint.getList(query);
}

function isSupportedCategory(category) {
  return categories.indexOf(category) >= 0;
}

function isSortableField(fieldKey) {
  return sortableFields.hasOwnProperty(fieldKey) >= 0;
}

export default MainController;
