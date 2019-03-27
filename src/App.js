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

  componentDidMount() {
    this.setState({
      customClocks: JSON.parse(localStorage.getItem("customClocks")) || []
    });
  }

  componentDidUpdate() {
    //because setState is asynchronous
    localStorage.setItem(
      "customClocks",
      JSON.stringify(this.state.customClocks)
    );
  }

  addClock = city => {
    console.log("Here from the app:", city.city, city.time);
    const newClock = {
      city: city.city,
      time: city.time
    };
    let duplicate = false;
    this.state.customClocks.forEach(clock => {
      if (clock.city === newClock.city && clock.time === newClock.time) {
        duplicate = true;
        return;
      }
    });
    if (!duplicate) {
      this.setState({ customClocks: [...this.state.customClocks, newClock] });
    }
  };

  removeClock = city => {
    this.setState({
      customClocks: this.state.customClocks.filter(clock => clock.city !== city)
    });
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
          <div className="clock-board board">
            {clocks.map((clock, i) => (
              <Clock
                city={clock.city}
                time={clock.time}
                key={i}
                index={i}
                removeClock={this.removeClock}
              />
            ))}
          </div>
          <div className="find-city-board board">
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


export default App;
