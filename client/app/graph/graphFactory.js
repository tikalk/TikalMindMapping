/**
 * Created by shaiyerushalmi on 7/21/15.
 */
angular.module('mindmapApp').factory('graphFactory',['expertyFactory',function(expertyFactory){
    var graphDataRaw = mindMapVars.mockGraphData;

    var decorateGraphData = function(graphData){
        console.log('graphData', graphData.src);
        var linksArray = [];
        for(var i=0; i<graphData.src.length; i++)
        {
            var link = {
                "source": 0,
                 "target": i
            }
            linksArray.push(link);
        }
        graphData.links = linksArray;
        console.log('graphData',graphData);
        return graphData;

    }

    var getGraphData = function(options){

        var responseGraphData = decorateGraphData(graphDataRaw);


        return responseGraphData;
    };

    return {
        graphData: graphData,
        getGraphData: getGraphData
    }


}]);