import React, {Component} from "react"
import RadarChart from "./radarChart"
import d3 from "d3"

let margin = {top: 100, right: 100, bottom: 100, left: 100},
  legendPosition = {x: 25, y: 25},
  width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

let color = d3.scale.ordinal()
  .range(["#EDC951","#CC333F","#00A0B0"]);

class Results extends Component{
  state = this.props.location.state;

  render() {
    return(
        <RadarChart data={this.state.data} margin={margin} legendPosition={legendPosition} width={width} height={height} color={color}
        maxValue={0.5} wrapWidth={60} levels={5} axisName={"reason"} areaName={"device"} value={"value"} />
      )
  }
}

export default Results;