/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('employeeFactory',['$q', '$http',function($q, $http){

    var urlAll = "/backend/users/user/all";

    var collection = {};

    var API = {
        fetchAll: function()
        {
            var deferred = $q.defer();
            $http.get(urlAll)
                .success(function(data){
                    console.log('success', data);
                    collection = data;
                    deferred.resolve(data);

                })
                .error(function(error){
                    console.log('error', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }
    }


    return {
        API: API,
        collection: collection
    };


}]);