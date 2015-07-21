/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('graphFactory',[function(){
    var graphData = mindMapVars.mockGraphData;

    return {
        graphData: graphData
    }


}]);