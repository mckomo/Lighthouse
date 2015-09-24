import restangularConfig from './components/restangular/restangular.config';
import sizeFilter from './components/units/size.filter.js';
import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';
import MainController from './main/main.controller';

angular.module('lighthouse', ['ngSanitize', 'restangular', 'ngRoute'])
  .config(config)
  .config(routerConfig)
  .config(restangularConfig)
  .run(runBlock)
  .filter('size', sizeFilter)
  .controller('MainController', MainController);
