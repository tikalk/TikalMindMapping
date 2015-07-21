angular.module('mindmapApp')
    .directive('map', ['graphFactory', function(graphFactory) {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {


                var options = {};
                var graphData = graphFactory.getGraphData(options);


                /* Set the diagrams Height & Width */
                var h = 500, w = 950;
                /* Set the color scale we want to use */
                var color = d3.scale.category20();
                /* Establish/instantiate an SVG container object */
                var svg = d3.select("#graphData")
                    .append("svg")
                    .attr("height",h)
                    .attr("width",w);
                /* Build the directional arrows for the links/edges */
                svg.append("svg:defs")
                    .selectAll("marker")
                    .data(["end"])
                    .enter().append("svg:marker")
                    .attr("id", String)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 15)
                    .attr("refY", -1.5)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

                makeDiag();
                /* Define the main worker or execution function */
                function makeDiag() {
                    /* Draw the node labels first */
                    var texts = svg.selectAll("text")
                        .data(graphData.src)
                        .enter()
                        .append("text")
                        .attr("fill", "black")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "10px")
                        .text(function(d) {
                            return d.name;
                        });
                    /* Establish the dynamic force behavor of the nodes */
                    var force = d3.layout.force()
                        .nodes(graphData.src)
                        .links(graphData.links)
                        .size([w,h])
                        .linkDistance([250])
                        .charge([-1500])
                        .gravity(0.3)
                        .start();
                    /* Draw the edges/links between the nodes */
                    var edges = svg.selectAll("line")
                        .data(graphData.links)
                        .enter()
                        .append("line")
                        .style("stroke", "#ccc")
                        .style("stroke-width", 1)
                        .attr("marker-end", "url(#end)");
                    /* Draw the nodes themselves */
                    var nodes = svg.selectAll("circle")
                        .data(graphData.src)
                        .enter()
                        .append("circle")
                        .attr("r", 20)
                        .attr("opacity", 0.5)
                        .style("fill", function(d) {
                            var clr = '#f00';
                            if (d.type === 'source') {
                                clr = '#0f0';
                            }
                            return clr;
                        })
                        .call(force.drag);
                    /* Run the Force effect */
                    force.on("tick", function() {
                        edges.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });
                        nodes.attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; })
                        texts.attr("transform", function(d) {
                            return "translate(" + d.x + "," + d.y + ")";
                        });
                    });
                };
            }
        };
    }]);