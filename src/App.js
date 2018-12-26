import React, { Component } from 'react';
import Filter from './Filter';
import axios from 'axios';

export class MapContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
      locations: [],
      map: {},
      marker: '',
      infowindow: {}
    }
  }

  componentDidMount() {
    this.getVenues();
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "E1VWQX0TSLRJREOKSHAJQNYZ22SZ3Z3DA41H5VRWKPSELBY3",
      client_secret: "UGQSNMV335DIRCFRSCGIWBLFC1PSJBDE3WI0OMA4JTEUWGLY",
      query: "food",
      near: "Santa Clara",
      limit: 30,
      v: "20130815"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          locations: response.data.response.groups[0].items,
          lading: false
        }, this.renderMap())
        
        return (response.data.response.groups[0].items);
      })
      .catch(error => {
        console.log("ERROR!! " + error);
        return (error);
      })
  }

  renderMap = () => {
    window.initMap = this.initMap.bind(this);
    let apiKey = 'AIzaSyDUBm5zMU5A55pcXQdrzgqnn6Y_9jTpOz4';
    let script = window.document.createElement("script");
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap';
    script.async = true;
    script.onerror = () => {
        document.write("Google Maps are not loaded");
    };
    window.document.getElementsByTagName("script")[0].parentNode.insertBefore(
      script, window.document.getElementsByTagName("script")[0]);
  }

  initMap = () => {
    document.getElementById('map').style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.357, lng: -121.9578},
        zoom: 13,
        mapTypeControl: false
    });

    let infoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(infoWindow, 'closeclick', () => {
        this.closeMarkerWindow();
    });

    this.setState({
        map: map,
        infowindow: infoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", () => {
        window.google.maps.event.trigger(map, "resize");
        this.state.map.setCenter(map.getCenter());
    });

    window.google.maps.event.addListener(map, 'click', () => {
        this.closeMarkerWindow();
    });

    var locations = [];
    this.state.locations.forEach(location => {
      var marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(location.venue.location.lat, location.venue.location.lng),
          animation: window.google.maps.Animation.DROP,
          map: map
      });

      marker.addListener('click', () => {
          this.openMarkerWindow(location);
      });

      location.venue.marker = marker;
      location.venue.display = true;
      locations.push(location);
    });

    this.setState({
        locations: locations
    });
  }

  openMarkerWindow(location) {
    let marker = location.venue.marker;
    this.closeMarkerWindow();
    this.state.infowindow.open(this.state.map, marker);
    this.state.infowindow.setContent('Data is being loaded ...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -100);

    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      marker: marker
    });

    this.getData(location);
  }

  closeMarkerWindow() {
    if (this.state.marker) {
        this.state.marker.setAnimation(null);
    }
    this.setState({
        marker: ''
    });
    this.state.infowindow.close();
  }

  getData(location) {
    try {
      var location_data = location.venue; //data.response.venues[0];
      //console.log(location_data);
      var restaurantName = '<br><b>Restaurant Name: </b>' + location_data.name + '<br>';
      var address = '<br><b>Address: </b>' + location_data.location.address + '<br>';
      var lat = '<br><b>Lat: </b>' + location_data.location.lat + '<br>';
      var lng = '<br><b>Lng: </b>' + location_data.location.lng + '<br>';
      var info = '<br><a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Info by Foursquare </a>'
      this.state.infowindow.setContent(restaurantName + address + lat + lng + info);
    } catch {
      this.state.infowindow.setContent("Data can't be downloaded");
    };
  }

  render() {

    if (this.state.locations.length === 0) {
      return 'Content Loading...'
    } 

    return (
      <div className='App' role='main'>
        <Filter 
          key="1" 
          locations={this.state.locations}
          openMarkerWindow={this.openMarkerWindow.bind(this)}
          closeMarkerWindow={this.closeMarkerWindow.bind(this)}
        />
        <div id='map'></div> 
      </div>
    );

  }
}

export default MapContainer;