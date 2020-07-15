import React, { Component } from "react";
import "./TrafficLight.css";
import classnames from "classnames";

const red = 0;
const orange = 1;
const green = 2;
class TrafficLight extends Component {
  render() {
    const { currentColor } = this.props;
    return (
      <div className="TrafficLight">
        <div
          className={classnames("bulb", "red", {
            active: currentColor === red,
          })}
        ></div>
        <div
          className={classnames("bulb", "orange", {
            active: currentColor === orange,
          })}
        ></div>
        <div
          className={classnames("bulb", "green", {
            active: currentColor === green,
          })}
        ></div>
      </div>
    );
  }
}

export default TrafficLight;
