/**
 * Created with JetBrains PhpStorm.
 * User: Ollie Maitland
 * Date: 22/08/13
 * Time: 09:09
 * To change this template use File | Settings | File Templates.
 */

angular.module( 'comparcelTester.payload', [
    'ui.state',
    'titleService',
    "$http",
    'ngGrid'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'payload', {
        url: '/payload',
        views: {
            "main": {
                controller: 'PayloadCtrl',
                templateUrl: 'payload/payload.tpl.html'
            }
        }
    });
})

.controller( 'PayloadCtrl', function PayloadController( $scope, titleService, $http ) {

        debugger;
        $scope.defaultPayload = {};

        $http(
        {
            method: 'GET',
            url: '/assets/defaultPayload.json'
        }).success(function(data, status, headers, config) {

                // set local storage value
                $scope.defaultPayload = data;

        }).error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        titleService.setTitle( 'Configure payload' );

        $scope.savePayload = function (payloadContent) {

            // @todo move to an injected service somewhere
            // maybe webStorageModule
            window.localStorage.payloadContent = payloadContent;

        };

});