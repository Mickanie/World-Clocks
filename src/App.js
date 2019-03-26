import React, { Component } from "react";
import "./css/App.css";
import Clock from "./Clock";
import Search from "./Search";
import ListOfCities from "./ListOfCities";

class App extends Component {
  state = {
    searchField: "",
    customClocks: []
  };

  addClock = city => {
    console.log("Here from the app:", city.city, city.time);
    const newClock = {
      city: city.city,
      time: city.time
    };
    this.setState({ customClocks: [...this.state.customClocks, newClock] });
  };

  onSearchChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    let clocks = this.state.customClocks;
    return (
      <div className="App">
        <h1>World Clocks</h1>
        <div className="boards">
          <div className="clock-board" style={clockBoardStyle}>
            {clocks.map((clock, i) => (
              <Clock city={clock.city} time={clock.time} key={i} />
            ))}
          </div>
          <div className="find-city-board" style={findCityStyle}>
            <h2>Add new time to the board</h2>
            <Search onSearchChange={this.onSearchChange} />
            <ListOfCities
              searchField={this.state.searchField}
              addClock={this.addClock}
            />
          </div>
        </div>
      </div>
    );
  }
}
const clockBoardStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "70%",
  height: "80vh",
  borderRadius: "25px",
  background: "#333",
  alignItems: "center",
  margin: "20px",
  padding: "40px"
};

const findCityStyle = {
  height: "80vh",
  borderRadius: "25px",
  background: "#333",
  alignItems: "center",
  margin: "20px",
  padding: "40px",
  width: "25%"
};

export default App;
