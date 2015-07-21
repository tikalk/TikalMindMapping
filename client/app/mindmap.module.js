/**
 * Created by robertferentz on 21/07/15.
 */
var mindmapApp = angular.module('mindmapApp', ['ngSanitize', 'ui.router']);

mindmapApp.controller('main', ['$scope',function($scope) {
    $scope.appName = 'Tikal Mind Mapping';
}]);

mindmapApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/employee");

    $stateProvider
        .state('employee', {
            url: "/employee",
            templateUrl: "app/employee/editEmployee.tpl.html",
            controller: ''
        })
        .state('experty', {
            url: "/experty",
            templateUrl: "app/experty/editExperty.tpl.html",
            controller: ''
        })
        .state('graph', {
            url: "/graph",
            templateUrl: "app/graph/graph.tpl.html",
            controller: ''
        });
});