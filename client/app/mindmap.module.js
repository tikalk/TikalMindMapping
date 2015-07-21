/**
 * Created by robertferentz on 21/07/15.
 */
(function(angular){
    angular.module('mindmap',['ngSanitize']).controller('main',['$scope',function($scope){
        $scope.appName = 'Tikal Mind Mapping';
    }]);
})(angular);