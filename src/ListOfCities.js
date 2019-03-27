import React, { Component } from "react";
import City from "./City";

class ListOfCities extends Component {
  state = {
    citiesTime: []
  };

  componentDidMount() {
    let citiesArray = [];
    fetch(
      "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json"
    )
      .then(response => response.json())
      .then(result => {
        result.forEach(timezone => {
          const offset = timezone.offset;
          timezone.utc.forEach(city => {
            const array = city.replace("_", " ").split("/");
            const cityName = array[1];
            const regionName = array[0];
            if (cityName === undefined || cityName.includes("GMT")) return;

            const newCity = {
              city: cityName,
              region: regionName,
              time: offset
            };
            let duplicate = false;
            citiesArray.forEach(city => {
              if (
                city.city === newCity.city &&
                city.region === newCity.region &&
                city.time === newCity.time
              ) {
                duplicate = true;
                return;
              }
            });
            if (!duplicate) {
              citiesArray.push(newCity);
            }
          });
        });
        console.log(citiesArray);
        this.setState({ citiesTime: citiesArray });
      });
  }

  addClock = () => {
    console.log("Hello");
  };

  render() {
    let searchField = this.props.searchField.toLowerCase();
    const view = searchField
      ? this.state.citiesTime.filter(result => {
          return JSON.stringify(result)
            .toLowerCase()
            .includes(searchField);
        })
      : this.state.citiesTime;

    let cities = view;
    return (
      <div style={containerStyle}>
        {cities &&
          cities.map((city, i) => (
            <City key={i} city={city} addClock={this.props.addClock} />
          ))}
      </div>
    );
  }
}

const containerStyle = {
  height: "60vh",
  overflowY: "scroll"
};

export default ListOfCities;
