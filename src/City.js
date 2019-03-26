import React, { Component } from "react";
import "./css/City.css";

class City extends Component {
  addClock = e => {
    console.log("Lets add a clock for ", this.props.city.city);
  };
  render() {
    let city = this.props.city;
    let cityName = city.city;
    let offset = city.time;
    return (
      <div
        className="cityCard"
        onClick={this.props.addClock.bind(this, city)}
      >
        {cityName}, {city.region}, {offset}
      </div>
    );
  }
}

export default City;
