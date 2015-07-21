var mindmapApp = angular.module('mindmapApp', ['ngSanitize', 'ui.router']);

mindmapApp.controller('main', ['$scope',function($scope) { 
    $scope.appName = 'Tikal Mind Mapping';
}]);

mindmapApp.config(function ($stateProvider, $urlRouterProvider) { 
    $urlRouterProvider.otherwise("/employees");   

    $stateProvider
        .state('employees', {
            url: "/employees",
            templateUrl: "app/employee/listEmployee.tpl.html",
            controller: 'EmployeeCtrl' 
        })
        .state('employee', {
            url: "/employee",
            templateUrl: "app/employee/editEmployee.tpl.html",
            controller: 'EmployeeCtrl' 
        })
        .state('experty', {
            url: "/experty",
            templateUrl: "app/experty/editExperty.tpl.html",
            controller: 'ExpertyCtrl'
        })
        .state('experties', {
            url: "/experties",
            templateUrl: "app/experty/listExperty.tpl.html"            
        })
        .state('graph', {
            url: "/graph",
            templateUrl: "app/graph/graph.tpl.html",
            controller: 'GraphController'
        })
        .state('graph.employee', {
            url: "/employee/:id",
            templateUrl: "app/graph/graph.tpl.html",
            controller: 'GraphController'
        });
});