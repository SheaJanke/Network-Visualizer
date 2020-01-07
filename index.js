var graph = {
  "nodes": [
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1},
    {"id": "Testing", "group":5},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":5},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3},
    {"id": "Testing", "group":3}
    
  ],

  "links": [
    {"source": "Napoleon", "target": "Myriel"},
    {"source": "Testing", "target": "Myriel"}
  ]
}
var svg = d3.select("svg"),
    width = +window.innerWidth,
    height = +window.innerHeight;
window.addEventListener('resize', function(){
  width = this.window.innerWidth;
  height = this.window.innerHeight;
  simulation.force('x',d3.forceX(width/2).strength(0.1))
  .force('y',d3.forceY(height/2).strength(0.1));
  simulation.restart();
})
var color = d3.scaleOrdinal(d3.schemeCategory20);
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-60))
    .force('x', d3.forceX(width/2).strength(0.1))
    .force('y',d3.forceY(height/2).strength(0.1));
var link = svg.append("g")
    .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
    .attr("stroke-width", 3);
var node = svg.append("g")
    .attr("class", "nodes")
  .selectAll("circle")
  .data(graph.nodes)
  .enter().append("circle")
    .attr("r", 8)
    .attr("fill", function(d) { return color(d.group); })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
node.append("title")
    .text(function(d) { return d.id; });
simulation
    .nodes(graph.nodes)
    .on("tick", ticked);
simulation.force("link")
    .links(graph.links);

function ticked() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  node
      .attr("cx", function(d) { 
        if(d.x < 0){
          return 0; 
        }else if(d.x > screen.width){
          return screen.width;
        }
        return d.x; 
      })
      .attr("cy", function(d) { return d.y; });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function addNode(){
  graph.nodes.push({'id':'Test', 'group':1});

  node.data(graph.nodes)
  .selectAll('circle')
  .enter().append("circle")
  .attr("r", 8)
  .attr("fill", function(d) { return color(d.group); })
  .attr("cx", function(d) { 
    if(d.x < 0){
      return 0; 
    }else if(d.x > screen.width){
      return screen.width;
    }
    return d.x; 
  })
  .attr("cy", function(d) { return d.y; })
  .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  node.append("title")
    .text(function(d) { return d.id; });
  simulation
    .nodes(graph.nodes)
}

function changeMode(clicked){
  document.getElementById('mode').innerHTML = clicked.innerHTML;
}

function changeAlgorithm(clicked){
  document.getElementById('algorithm').innerHTML = clicked.innerHTML;
}

function changeSpeed(clicked){
  document.getElementById('speed').innerHTML = clicked.innerHTML;
}