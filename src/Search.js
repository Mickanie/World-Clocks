import React, { Component } from "react";
import "./css/Search.css";

class Search extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="city"
            id="1"
            placeholder="Find a city"
            onChange={this.props.onSearchChange}
          />
        </form>
      </div>
    );
  }
}

export default Search;
