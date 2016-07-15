import React, {Component, PropTypes} from "react"
import Faux from "react-faux-dom"
import d3 from "d3"
import legend from "d3-svg-legend"
import reactMixin from "react-mixin"

// let createHook = (comp,elem,statename) => {
//   let elems = new Map(),
//     interval;
//   const updateState = ()=> {
//     comp.setState({[statename]:elem.toReact()})
//   };
//   setTimeout(updateState);
//   comp.isAnimating = ()=> !!interval;
//   return (transition)=> {
//     transition.each((e)=>{
//       elems.set(e,(elems.get(e) || new Set()).add(transition.id));
//       interval = interval || setInterval(updateState,16)
//     });
//     transition.each("end",(e)=>{
//       let anims = elems.get(e);
//       anims.delete(transition.id);
//       if (anims.size){
//         elems.set(e,anims)
//       } else {
//         elems.delete(e)
//       }
//       if (!elems.size) interval = clearInterval(interval)
//     })
//   }
// };

/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

class RadarChart extends Component {

  constructor(props) {
    super(props);
    this.drawFauxDOM = this.drawFauxDOM.bind(this);
  }

  static propTypes = {
    //Width of the circle
    w: PropTypes.number,
    //Height of the circle
    h: PropTypes.number,
    //The margins around the circle
    margin: PropTypes.object,
    // the position of the legend, from the top-left corner of the svg
    legendPosition: PropTypes.object,
    //How many levels or inner circles should there be drawn
    levels: PropTypes.number,
    //What is the value that the biggest circle will represent
    maxValue: PropTypes.number,
    //How much farther than the radius of the outer circle should the labels be placed
    labelFactor: PropTypes.number,
    //The number of pixels after which a label needs to be given a new line
    wrapWidth: PropTypes.number,
    //The opacity of the area of the blob
    opacityArea: PropTypes.number,
    //The size of the colored circles of each blog
    dotRadius: PropTypes.number,
    //The opacity of the circles of each blob
    opacityCircles: PropTypes.number,
    //The width of the stroke around each blob
    strokeWidth: PropTypes.number,
    //If true the area and stroke will follow a round path (cardinal-closed)
    roundStrokes: PropTypes.bool,
    //Color function
    color: PropTypes.func,
    axisName: PropTypes.string,
    areaName:PropTypes.string,
    value: PropTypes.string,
    sortAreas: PropTypes.bool
  };

  static defaultProps = {
    w: 600,				                          //Width of the circle
    h: 600,				                          //Height of the circle
    margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins around the circle
    legendPosition: {x: 20, y: 20},         // the position of the legend, from the top-left corner of the svg
    levels: 3,				                      //How many levels or inner circles should there be drawn
    maxValue: 0, 				                    //What is the value that the biggest circle will represent
    labelFactor: 1.25, 			                //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, 			                    //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, 			                //The opacity of the area of the blob
    dotRadius: 4, 				                  //The size of the colored circles of each blog
    opacityCircles: 0.1, 		              	//The opacity of the circles of each blob
    strokeWidth: 2, 			                  //The width of the stroke around each blob
    roundStrokes: true,			                //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scale.category10(),		        //Color function
    axisName: "axis",
    areaName:"areaName",
    value: "value",
    sortAreas: true
  };
 
  state = {
    chart: null
  };

  render() {
    return(
      <div>
        CHART
        {this.state.chart}
      </div>

    )
  }

  componentDidMount() {
    // get an array
    let data = this.props.data;
    let faux = this.connectFauxDOM("div", "chart");
    // let hook = createHook(this,faux,"chart");
    let self = this;

    // No longer needed because we use props to configure the chart options
    // //Put all of the options into a variable called this.props
    // if('undefined' !== typeof options){
    //   for(var i in options){
    //     if('undefined' !== typeof options[i]){ this.props[i] = options[i]; }
    //   }//for i
    // }//if

    // Map the fields specified in the configuration
    // to the axis and value variables
    var axisName = self.props.axisName,
      areaName = self.props.areaName,
      value = self.props.value;

    // Calculate the average value for each area
    data.forEach(function(d){
      d[value + "Average"] = d3.mean(d.values, function(e){ return e[value] });
    });

    //Sort the data for the areas from largest to smallest
    //by average value as an approximation of actual blob area
    //so that that the smallest area is drawn last
    //and therefore appears on top
    data = data.sort(function(a, b){
      a = a[value + "Average"];
      b = b[value + "Average"];
      return b - a;
    });

    // Convert the nested data passed in
    // into an array of values arrays
    data = data.map(function(d) { return d.values });

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = Math.max(this.props.maxValue, d3.max(data, function(i){
      return d3.max(i.map(
        function(o){ return o[value]; }
      ))
    }));

    var allAxis = (data[0].map(function(d, i){ return d[axisName] })),	//Names of each axis
      total = allAxis.length,					//The number of different axes
      radius = Math.min(self.props.w/2, self.props.h/2), 			//Radius of the outermost circle
      Format = d3.format('%'),			 	//Percentage formatting
      angleSlice = Math.PI * 2 / total;			//The width in radians of each "slice"

    // Scale for the radius
    var rScale = d3.scale.linear()
      .range([0, radius])
      .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Remove whatever chart with the same id/class was present before
    //Create a transition animation from first data set. if first time rendering, first data set should start at 0 so
    // the graph seems to emerge from the origin of the circle
    d3.select(faux).select("svg").transition().duration(1000);

    //Initiate the radar chart SVG
    var svg = d3.select(faux).append("svg")
      .attr("width",  self.props.w + self.props.margin.left + self.props.margin.right)
      .attr("height", self.props.h + self.props.margin.top + self.props.margin.bottom)
      .attr("class", "radar"+faux);
    //Append a g element
    var g = svg.append("g")
      .attr("transform", "translate(" + (self.props.w/2 + self.props.margin.left) + "," + (self.props.h/2 + self.props.margin.top) + ")");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    // //Filter for the outside glow
    // var filter = g.append('defs').append('filter').attr('id','glow'),
    //   feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
    //   feMerge = filter.append('feMerge'),
    //   feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
    //   feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid.selectAll(".levels")
      .data(d3.range(1,(self.props.levels+1)).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function(d, i){return radius/self.props.levels*d;})
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", self.props.opacityCircles);
    // .style("filter" , "url(#glow)");

    //Text indicating at what % each level is
    axisGrid.selectAll(".axisLabel")
      .data(d3.range(1,(self.props.levels+1)).reverse())
      .enter().append("text")
      .attr("class", "axisLabel")
      .attr("x", 4)
      .attr("y", function(d){return -d*radius/self.props.levels;})
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      .text(function(d,i) { return Format(maxValue * d/self.props.levels); });

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");
    //Append the lines
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
      .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-width", "2px");

    //Append the labels at each axis
    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", function(d, i){ return rScale(maxValue * self.props.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
      .attr("y", function(d, i){ return rScale(maxValue * self.props.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
      .text(function(d){return d})
      .call(wrap, self.props.wrapWidth);

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////


    //The radial line function to create blob outline
    var radarLine = d3.svg.line.radial()
      .interpolate("linear-closed")
      .radius(function(d) { return rScale(d[value]); })
      .angle(function(d,i) {	return i*angleSlice; });

    if(self.props.roundStrokes) {
      radarLine.interpolate("cardinal-closed");
    }

    //Create a wrapper for the blobs
    var blobWrapper = g.selectAll(".radarWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", function(d) {
        return "radarArea" + " " + d[0][areaName].replace(/\s+/g, '') //Remove spaces from the areaName string to make one valid class name
      })
      .attr("d", function(d,i) { return radarLine(d); })
      .style("fill", function(d,i) { return self.props.color(i); })
      .style("fill-opacity", self.props.opacityArea)
      .on('mouseover', function (d,i){
        console.log("d", d);
        console.log("this", this);
        //Dim all blobs
        d3.selectAll(".radarArea")
          // .transition().duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3.select(self)
          // .transition().duration(200)
          .style("fill-opacity", 0.7);
      })
      .on('mouseout', function(){
        //Bring back all blobs
        d3.selectAll(".radarArea")
          // .transition().duration(200)
          .style("fill-opacity", self.props.opacityArea);
      });

    // Create the blob outlines
    blobWrapper.append("path")
      // .transition().duration(800)
      .attr("class", "radarStroke")
      .attr("d", function(d,i) { return radarLine(d); })
      .style("stroke-width", self.props.strokeWidth + "px")
      .style("stroke", function(d,i) { return self.props.color(i); })
      .style("fill", "none");
    // .style("filter" , "url(#glow)");

    // Append the data circles
    blobWrapper.selectAll(".radarCircle")
      .data(function(d,i) { return d; })
      .enter().append("circle")
      .attr("class", "radarCircle")
      .attr("r", self.props.dotRadius)
      .attr("cx", function(d,i){ return rScale(d[value]) * Math.cos(angleSlice*i - Math.PI/2); })
      .attr("cy", function(d,i){ return rScale(d[value]) * Math.sin(angleSlice*i - Math.PI/2); })
      // .transition().duration(800)
      .style("fill", function(d,i,j) { return self.props.color(j); })
      .style("fill-opacity", 0.8);

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
      .data(function(d,i) { return d; })
      .enter().append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", self.props.dotRadius*1.5)
      .attr("cx", function(d,i){ return rScale(d[value]) * Math.cos(angleSlice*i - Math.PI/2); })
      .attr("cy", function(d,i){ return rScale(d[value]) * Math.sin(angleSlice*i - Math.PI/2); })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function(d,i) {
        newX =  parseFloat(d3.select(self).attr('cx')) - 10;
        newY =  parseFloat(d3.select(self).attr('cy')) - 10;

        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(Format(d[value]))
          // .transition().duration(200)
          .style('opacity', 1);
      })
      .on("mouseout", function(){
        tooltip
          // .transition().duration(200)
          .style("opacity", 0);
      });

    //Set up the small tooltip for when you hover over a circle
    var tooltip = g.append("text")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /////////////////////////////////////////////////////////
    /////////////////// Helper Functions ////////////////////
    /////////////////////////////////////////////////////////

    //Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text
    function wrap(text, width) {
      text.each(function() {
        // NOTE: added
        var text = d3.select(self),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.4, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          console.log("inside text WHILE statement!!!");
          console.log("tspan.node:", tspan.node());

          if (tspan.node() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }//wrap

    // on mouseover for the legend symbol
    // function cellover(d) {
    //   //Dim all blobs
    //   d3.selectAll(".radarArea")
    //     .transition().duration(200)
    //     .style("fill-opacity", 0.1);
    //   //Bring back the hovered over blob
    //   d3.select("." + data[d][0][areaName].replace(/\s+/g, ''))
    //     .transition().duration(200)
    //     .style("fill-opacity", 0.7);
    // }
    //
    // // on mouseout for the legend symbol
    // function cellout() {
    //   //Bring back all blobs
    //   d3.selectAll(".radarArea")
    //     .transition().duration(200)
    //     .style("fill-opacity", self.props.opacityArea);
    // }
    //
    // /////////////////////////////////////////////////////////
    // /////////////////// Draw the Legend /////////////////////
    // /////////////////////////////////////////////////////////
    //
    // svg.append("g")
    //   .attr("class", "legendOrdinal")
    //   .attr("transform", "translate(" + self.props["legendPosition"]["x"] + "," + self.props["legendPosition"]["y"] + ")");
    //
    // var legendOrdinal = d3.legend.color()
    // //d3 symbol creates a path-string, for example
    // //"M0,-8.059274488676564L9.306048591020996,
    // //8.059274488676564 -9.306048591020996,8.059274488676564Z"
    //   .shape("path", d3.svg.symbol().type("triangle-up").size(150)())
    //   .shapePadding(10)
    //   .scale(self.props.color)
    //   .labels(self.props.color.domain().map(function(d){
    //     return data[d][0][areaName];
    //   }))
    //   .on("cellover", function(d){ cellover(d); })
    //   .on("cellout", function(d) { cellout(); });
    //
    // svg.select(".legendOrdinal")
    //   .call(legendOrdinal);
  }
}

reactMixin(RadarChart.prototype, require("react-faux-dom/lib/mixins/core"));

export default RadarChart;
