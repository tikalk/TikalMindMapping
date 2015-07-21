/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('graphFactory',[function(){
    var graphData = mindMapVars.mockGraphData;



    var getGraphData = function(options){
        return graphData;
    };

    return {
        graphData: graphData,
        getGraphData: getGraphData
    }


}]);