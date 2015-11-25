var width = 1200,
height = 500,
radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
.range(["#98abc5", "#ff8c00"]);

var arc = d3.svg.arc()
.outerRadius(radius - 60)
.innerRadius(100);

var pie = d3.layout.pie()
.sort(null)
.value(function(d) { return d.value; });

var svg1 = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 4 + "," + height/2 + ")");

var svg2 = d3.select("svg")
.append("g")
.attr("transform", "translate(" + 3*width / 4 + "," + height/2 + ")");


d3.json("part.json", function(error, data) {

  var literate=[];
  var illiterate=[];

  literate[0]={};
  literate[1]={};
  illiterate[0]={};
  illiterate[1]={};

  literate[0].label="Literate Males";
  literate[0].value=0;
  literate[1].label="Literate Females";
  literate[1].value=0;

  illiterate[0].label="Illiterate Males";
  illiterate[0].value=0;
  illiterate[1].label="Illiterate Females";
  illiterate[1].value=0;

  for(i=11;i<=17;i++){
    literate[0].value=literate[0].value+data[i].literateMales;
    literate[1].value=literate[1].value+data[i].literateFemales;

    illiterate[0].value=illiterate[0].value+data[i].illiterateMales;
    illiterate[1].value=illiterate[1].value+data[i].illiterateFemales;
  }

  literate[0].percentage=literate[0].value*100/(literate[0].value+literate[1].value);
  literate[1].percentage=literate[1].value*100/(literate[0].value+literate[1].value);

  illiterate[0].percentage=illiterate[0].value*100/(illiterate[0].value+illiterate[1].value);
  illiterate[1].percentage=illiterate[1].value*100/(illiterate[0].value+illiterate[1].value);

  var g1 = svg1.selectAll(".arc")
  .data(pie(literate))
  .enter().append("g")
  .attr("class", "arc");

  g1.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.value); });

  g1.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.data.label; })
  .style("font-size", "16px")
  .append("tspan")
  .attr("x",0)
  .attr("dy",20)
  .text(function(d) { return d.data.percentage.toFixed(2)+"%"; });

  var g2 = svg2.selectAll(".arc")
  .data(pie(illiterate))
  .enter().append("g")
  .attr("class", "arc")
  .attr("cx", 100)
  .attr("cy",100);

  g2.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.value); });

  g2.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.data.label; })
  .style("font-size", "16px")
  .append("tspan")
  .attr("x",0)
  .attr("dy",20)
  .text(function(d) { return d.data.percentage.toFixed(2)+"%"; })
});
