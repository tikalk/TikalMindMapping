/**
 * Created by shaiyerushalmi on 7/21/15.
 */

 (function() {
    'use strict';

    angular
        .module('mindmapApp')
        .controller('EmployeeCtrl', Employee);

    function Employee() {
    	var vm = this;
    	vm.name = "Employee 1111 ";
     }
})();

