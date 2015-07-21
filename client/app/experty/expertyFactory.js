/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('expertyFactory',['$http',function($http){

    var urlAll = "/backend/users/user/all";

    var collection = {};

    var API = {
        fetchAll: function()
        {
            $http.get(urlAll)
                .success(function(data){
                    console.log('success', data);
                    collection = data;

                })
                .error(function(error){
                    console.log('error', error);
                })
        }
    }


    return {
        API: API,
        collection: collection
    };


}]);