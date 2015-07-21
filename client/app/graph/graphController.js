angular.module('mindmapApp').controller('GraphController', graph);
graph.$inject = ['$scope'];

function graph($scope) {
    $scope.name = 'Erez';
}