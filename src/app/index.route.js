function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
