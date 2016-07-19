import React, {Component} from "react"
import RadarChart from "./radarChart"
import d3 from "d3"

let margin = {top: 100, right: 100, bottom: 100, left: 100},
  legendPosition = {x: 25, y: 25},
  width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

let color = d3.scale.ordinal()
  .range(["#EDC951","#CC333F","#00A0B0"]);

// this component will render differently when called by the webapp formcontainer or by a direct URL link.
// when called by formcontainer, it should push the route with the UUID that we send back from server as the pathname
// when called from direct URL link, we should pull the ID parameter and query the database in componentWillMount

class Results extends Component {
  componentDidMount() {
    let self = this;
    const id = this.props.params.id;

    const fetchHeaders = new Headers();

    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "GET",
      headers: fetchHeaders,
      mode: "cors"
    };

    const fetchReq = new Request("/results/" + id, httpOptions);

    fetch(fetchReq, httpOptions)
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({data: data.watsonData});
        }, function (err) {
          console.log("error", err);
        });
      }).catch(function (err) {
      console.log("FETCH ERROR", err);
    });
  }

  render() {
    if(!this.state) {
      return (
        <div>Loading...</div>
      )
    }

    return(
        <RadarChart data={this.state.data} margin={margin} legendPosition={legendPosition} width={width} height={height} color={color}
        maxValue={0.5} wrapWidth={60} levels={5} axisName={"reason"} areaName={"device"} value={"value"} />
      )
  }
}

export default Results;