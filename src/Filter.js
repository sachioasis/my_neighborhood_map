import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

class Filter extends Component {

  state = {
    locations: [],
    query: "",
    suggestions: true
  };

  searchLocations(event) {
    this.props.closeMarkerWindow();
    let { value } = event.target;
    let locations = [];
    this.props.locations.forEach(location => {
      if (location.venue.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.venue.marker.setVisible(true);
        locations.push(location);
      } else {
        location.venue.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.locations
    });
  }

  render() {
    return (
      <div className="filter-pane" id="filter-pane">
        <header>
          <h1>Santa Clara Neighborhood</h1>
        </header>
        <input
          role="search"
          aria-labelledby="filter"
          id="filter-box"
          className="filter-box"
          type="text"
          placeholder="Filter"
          value={this.state.query}
          onChange={this.searchLocations.bind(this)}
        />
        <div className="results-container" id="results-container">
          <div className="results-list" id="results-list">
            {this.state.locations.map((location, index) => (
              <button
                key={index}
                role="button"
                className="item"
                tabIndex="0"
                onKeyPress={this.props.openMarkerWindow.bind(
                  this,
                  location
                )}
                onClick={this.props.openMarkerWindow.bind(this, location)}
              >
                {location.venue.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  locations: PropTypes.array.isRequired,
  openMarkerWindow: PropTypes.func.isRequired,
  closeMarkerWindow: PropTypes.func.isRequired
};

export default Filter;