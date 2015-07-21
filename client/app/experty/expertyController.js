/**
 * Created by shaiyerushalmi on 7/21/15.
 */

 (function() {
    'use strict';

    angular
        .module('mindmapApp')
        .controller('ExpertyCtrl', Experty);

     Experty.$inject = ['expertyFactory'];

    function Experty(expertyFactory) {
    	var vm = this;
        vm.collection = {};
    	vm.name = "Employee 2222";

        vm.fetchAll = function(){
            console.log('fetchAll');
            expertyFactory.API.fetchAll().then(
                function(data){
                    vm.collection = data.skills;
                    console.log('dataController', vm.collection);

                }, function(err){
                    console.log('error',error)
                }
            )
        }
     }
})();

