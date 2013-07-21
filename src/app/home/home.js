/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'comparcelTester.home', [
  'ui.state',
  'titleService',
  'comparcelTester.priceService',
  'ngGrid'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, titleService, priceService ) {

        $scope.testResults = [];
        $scope.config = {   target:'comparcel.com', reference:'staging.comparcel.com',
                            username: '', password: ''};

        $scope.runTests = function (config) {

            // loop through each of the bits

            var testParameterSpec = [
            {
                label:'UK to UK',
                from: 1,
                height: 30,
                length: 50,
                to: 1,
                type: 1,
                weight: 5,
                width: 30
            },
            {
                label:'UK to UK',
                from: 1,
                height: 30,
                length: 50,
                to: 1,
                type: 1,
                weight: 10,
                width: 30
            },
            {
                label:'UK to AU',
                from:1,
                type:1,
                weight:2,
                to:274,
                length:10,
                width:5,
                height:10,
                speed: '',
                insurance: '',
                despatch: '',
                receipt: '',
                tracking: '',
                signature: '',
                printer: '',
                payment: ''
            }];

            // set the price details
            priceService.setCredentials(config.username, config.password);

            var i = 1;

            angular.forEach(testParameterSpec, function(testParameters) {

                var holder = {};

                // run on the reference service first
                priceService.setServer(config.reference);
                priceService.execute(testParameters).then(function(http) {
                    holder['referenceCount'] = priceService.processCount(http.data.results);

                    // do the next one
                    priceService.setServer(config.target);
                    priceService.execute(testParameters).then(function(http) {

                        holder['targetCount'] = priceService.processCount(http.data.results);

                        // add results into myData
                        var result = {
                            id : i,
                            label : testParameters.label + ' '+ testParameters.weight + 'kg',
                            count_reference: holder['referenceCount'],
                            count_target: holder['targetCount'],
                            count_match: (holder['referenceCount'] == holder['targetCount'])
                        };

                        $scope.testResults.push(result);

                        i++;
                    })
                });

            });
        };

        var columnDefs = [
                {field: 'id', displayName: 'ID'},
                {field: 'label', displayName: 'Label'},
                {field: 'count_reference', displayName:'Reference #', cellTemplate: '<a href="http://{{config.reference}}/?{{testParameters}}">{{row.getProperty(col.field)}}</a>'},
                {field: 'count_target', displayName:'Target #', cellTemplate: '<a href="#">{{row.getProperty(col.field)}}</a>'},
                {field: 'count_match', displayName:'Pass', cellTemplate: '<div ng-class="{red: row.getProperty(col.field) == false}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}
        ];

        // set-up grid Options
        $scope.gridOptions = { data: 'testResults', columnDefs: columnDefs };

        titleService.setTitle( 'Home' );
})

;

