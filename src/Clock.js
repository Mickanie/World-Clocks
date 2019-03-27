import React, { Component } from "react";

import "./css/Clock.css";
import Hand from "./Hand";

class Clock extends Component {
  state = {
    hourDegrees: "",
    minutesDegrees: "",
    secondsDegrees: ""
  };
  componentWillMount() {
    setInterval(this.setTime, 1000);
  }
  setTime = () => {
    const offset = this.props.time;
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = seconds * 6 - 90; //because of the starting position
    const minutes = now.getMinutes();
    const minutesDegrees = minutes * 6 - 90;
    let hour = now.getHours() + offset + now.getTimezoneOffset() / 60;
    if (hour > 12) {
      hour -= 12;
    }
    hour += minutes / 60;
    const hourDegrees = (hour / 12) * 360 - 90;
    this.setState({
      hourDegrees,
      minutesDegrees,
      secondsDegrees
    });
  };

  render() {
    const city = this.props.city;
    const time = this.props.time;

    return (
      <div
        className="clock-space"
        onClick={this.props.removeClock.bind(this, city)}
      >
        <div className="clock">
          <div className="clock-face">
            <Hand width="50%" height="6px" rotation={this.state.hourDegrees} />
            <Hand
              width="70%"
              height="4px"
              rotation={this.state.minutesDegrees}
            />
            <Hand
              width="70%"
              height="2px"
              rotation={this.state.secondsDegrees}
            />
          </div>
        </div>

        <p>
          {city}, {time} GMT
        </p>
      </div>
    );
  }
}

export default Clock;
