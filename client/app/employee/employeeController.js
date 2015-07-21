/**
 * Created by shaiyerushalmi on 7/21/15.
 */

 (function() {
    'use strict';

    angular
        .module('mindmapApp')
        .controller('EmployeeCtrl', Employee);

     Employee.$inject = ['employeeFactory'];

    function Employee(employeeFactory) {
    	var vm = this;
        vm.collection = {};
    	vm.name = "Employee 2222";
        vm.API = employeeFactory.API;
        vm.fetchAll = function(){
            console.log('fetchAll');
            employeeFactory.API.fetchAll().then(
                function(data){
                    vm.collection = data.users;
                    console.log('dataController', vm.collection);

                }, function(err){
                    console.log('error',error)
                }
            )
        }
        vm.getId = function(item)
        {
            var id = item['@rid'].replace("#", "");

            id = id.replace(/:/g, '_');

            return id;
        }

        vm.fetchAll();

     }
})();

