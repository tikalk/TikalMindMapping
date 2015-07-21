/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('expertyFactory',['$http','$q',function($http, $q){

    var urlAll = "/backend/users/skill/all";
    var urlSkillsByUser = "/backend/user/skill/";
    var urlUserBySkills = "/backend/skill/user/";

    var collection = {};

    var API = {
        fetchAll: function()
        {
            var deferred = $q.defer();
            $http.get(urlAll)
                .success(function(data){
                    console.log('successkjklj', data);
                    collection = data;
                    deferred.resolve(data);

                })
                .error(function(error){
                    console.log('error', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        },
        fetchSkillsByUserId: function(userId)
        {
            var deferred = $q.defer();
            $http.get(urlSkillsByUser. userId)
                .success(function(data){
                    console.log('fetchSkillsByUserId', data);
                    collection = data;
                    deferred.resolve(data);

                })
                .error(function(error){
                    console.log('error', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        },
        fetchUsersBySkillId: function(skillId)
        {
            var deferred = $q.defer();
            $http.get(urlUserBySkills. skillId)
                .success(function(data){
                    console.log('fetchSkillsByUserId', data);
                    collection = data;
                    deferred.resolve(data);

                })
                .error(function(error){
                    console.log('error', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        },



    }


    return {
        API: API,
        collection: collection
    };


}]);