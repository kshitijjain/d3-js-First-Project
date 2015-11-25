var width = 1200,
height = 500,
radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
.range(["#98abc5", "#ff8c00"]);

var arc = d3.svg.arc()
.outerRadius(radius - 60)
.innerRadius(0);

var pie = d3.layout.pie()
.sort(null)
.value(function(d) {return d.value;});

var svg1 = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");

var svg2 = d3.select("svg")
.append("g")
.attr("transform", "translate(" + ((width / 4) +width/2)+ "," + height / 2 + ")");


d3.json("part.json", function(error, data) {

  var maleFemale=[];
  var literateIlliterate=[];

  maleFemale[0]={};
  maleFemale[1]={};
  literateIlliterate[0]={};
  literateIlliterate[1]={};

  maleFemale[0].label="Total Males";
  maleFemale[0].value=0;
  maleFemale[1].label="Total Females";
  maleFemale[1].value=0;

  literateIlliterate[0].label="Total Literate Poulation";
  literateIlliterate[0].value=0;
  literateIlliterate[1].label="Total Illiterate Population";
  literateIlliterate[1].value=0;

  data.forEach(function(d) {
    maleFemale[0].value=maleFemale[0].value+d.literateMales+d.illiterateMales;
    maleFemale[1].value=maleFemale[1].value+d.literateFemales+d.illiterateFemales;

    literateIlliterate[0].value=literateIlliterate[0].value+d.literateMales+d.literateFemales;
    literateIlliterate[1].value=literateIlliterate[1].value+d.illiterateMales+d.illiterateFemales;
  });

  maleFemale[0].percentage=maleFemale[0].value*100/(maleFemale[0].value+maleFemale[1].value);
  maleFemale[1].percentage=maleFemale[1].value*100/(maleFemale[0].value+maleFemale[1].value);

  literateIlliterate[0].percentage=literateIlliterate[0].value*100/(literateIlliterate[0].value+literateIlliterate[1].value);
  literateIlliterate[1].percentage=literateIlliterate[1].value*100/(literateIlliterate[0].value+literateIlliterate[1].value);

  var g1 = svg1.selectAll(".arc")
  .data(pie(maleFemale))
  .enter().append("g")
  .attr("class", "arc");

  g1.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.value); });

  g1.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return (d.data.label); })
  .style("font-size", "16px")
  .append("tspan")
  .attr("x",0)
  .attr("dy",20)
  .text(function(d) { return d.data.percentage.toFixed(2)+"%"; })


  var g2 = svg2.selectAll(".arc")
  .data(pie(literateIlliterate))
  .enter().append("g")
  .attr("class", "arc");
  g2.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.value); });

  g2.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.data.label;})
  .style("font-size", "16px")
  .append("tspan")
  .attr("x",0)
  .attr("dy",20)
  .text(function(d) { return d.data.percentage.toFixed(2)+"%"; })
});
