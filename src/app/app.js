angular.module( 'comparcelTester', [
  'templates-app',
  'templates-common',
  'comparcelTester.home',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | comparcel.com' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

