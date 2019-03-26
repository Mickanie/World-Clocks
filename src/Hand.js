import React, { Component } from "react";
import "./css/Clock.css";

class Hand extends Component {
  render() {
    const height = this.props.height;
    const width = this.props.width;
    return <div className="hand" style={{ height, width, transform: `rotate(${this.props.rotation}deg)` }} />;
  }
}

export default Hand;
