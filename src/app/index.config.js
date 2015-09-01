function config ($logProvider, $compileProvider) {
  'ngInject';
  $logProvider.debugEnabled(true);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|magnet):/);
}

export default config;
