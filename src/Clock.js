import React, { Component } from "react";

import "./css/Clock.css";
import Hand from "./Hand";

class Clock extends Component {
  state = {
    hourDegrees: "",
    minutesDegrees: "",
    secondsDegrees: ""
  };
  componentDidMount() {
    const time = this.props.time;
    setInterval(this.setTime(time), 1000);
  }
  setTime = offset => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = seconds * 6 - 90; //because of the starting position
    const minutes = now.getMinutes();
    const minutesDegrees = minutes * 6 - 90;
    let hour = now.getHours() - offset - now.getTimezoneOffset() / 60;
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
    console.log(hour, minutes, seconds);
  };

  render() {
    const city = this.props.city;
    const time = this.props.time;

    return (
      <div>
        <div className="clock">
          <div className="clock-face">
            <Hand width="35%" height="8px" rotation={this.state.hourDegrees} />
            <Hand
              width="55%"
              height="6px"
              rotation={this.state.minutesDegrees}
            />
            <Hand
              width="65%"
              height="4px"
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
