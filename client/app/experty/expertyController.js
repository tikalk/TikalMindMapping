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
    	vm.name = "Employee 2222";

        vm.API = expertyFactory.API;
     }
})();

