var myData1=[];
var myData2=[];
d3.json("part.json", function(error, data) {

  data.forEach(function(d) {
    d["Literate Population"]=d.literateMales+d.literateFemales;
    d["Illiterate Population"]=d.illiterateMales+d.illiterateFemales;
    if(d.literateMales>10000000) myData1.push(d);
    else myData2.push(d);
  }
);


data=myData1;
var margin = { top: 20, right: 0, bottom: 180, left: 100 },
width = 1200 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.ordinal()
.range(["#097054", "#6599FF"]);

var xAxis = d3.svg.axis()
.scale(x0)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var seriesNames = d3.keys(data[0]).filter(function (key) { return (key == "Literate Population" || key=="Illiterate Population") });
data.forEach(function (d) {
  d.states = seriesNames.map(function (name) {
    return { name: name, value: +d[name] }; });
  });

x0.domain(data.map(function (d) { return d.areaName.split("-")[1]; }));

x1.domain(seriesNames).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, (10 + d3.max(data, function (d) { return d3.max(d.states, function (d) { return d.value; }); }))]);


  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("font-size", "12px")
  .style("text-anchor","end")
  .attr("dx", "-.8em")
  .attr("dy", "-0.55em")
  .attr("transform", "rotate(-60)");


  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Population");

  var state = svg.selectAll(".state")
  .data(data)
  .enter().append("g")
  .attr("class", "g")
  .attr("transform", function (d) { return "translate(" + x0(d.areaName.split("-")[1]) + ",0)"; });

  state.selectAll("rect")
  .data(function (d) { return d.states; })
  .enter().append("rect")
  .attr("width", x1.rangeBand())
  .attr("x", function (d) { return x1(d.name); })
  .attr("y", function (d) { return y(d.value); })
  .attr("height", function (d) { return height - y(d.value); })
  .style("fill", function (d) { return color(d.name); });


  var legend = svg.selectAll(".legend")
  .data(seriesNames.slice().reverse())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function (d) { return d; })
  .on("click", function (d) {
    alert(d);
    state.selectAll("rect")
    .update()

    .exit().transition()
    .attr("height", 0)
    .remove();

    state.selectAll("rect")
    .update()


    state.selectAll("rect").exit().transition().attr("height", 0).remove();
  });

  data=myData2;

  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var seriesNames = d3.keys(data[0]).filter(function (key) { return (key == "Literate Population" || key=="Illiterate Population") });
  data.forEach(function (d) {

    d.states = seriesNames.map(function (name) {
      return { name: name, value: +d[name] }; });
    });

    x0.domain(data.map(function (d) { return d.areaName.split("-")[1]; }));
    x1.domain(seriesNames).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, (10 + d3.max(data, function (d) { return d3.max(d.states, function (d) { return d.value; }); }))]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "12px")
    .style("text-anchor","end")
    .attr("dx", "-.8em")
    .attr("dy", "-0.55em")
    .attr("transform", "rotate(-60)");

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Population");

    var state = svg.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function (d) { return "translate(" + x0(d.areaName.split("-")[1]) + ",0)"; });

    state.selectAll("rect")
    .data(function (d) { return d.states; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function (d) { return x1(d.name); })
    .attr("y", function (d) { return y(d.value); })
    .attr("height", function (d) { return height - y(d.value); })
    .style("fill", function (d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
    .data(seriesNames.slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) { return d; })
    .on("click", function (d) {
      alert(d);
      state.selectAll("rect")
      .update()
      .exit().transition()
      .attr("height", 0)
      .remove();

      state.selectAll("rect")
      .update()

      state.selectAll("rect").exit().transition().attr("height", 0).remove();
    });
  });
