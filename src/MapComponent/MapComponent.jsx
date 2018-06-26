import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadScript } from '../../src/utils'
import Config from '../../src/config.js'

import './MapComponent.css'

export default class MapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapMarkers: [],
    }
  }
  static Props = {
    markerList: PropTypes.array,
  };

  componentDidMount() {
    this.initiateMap()
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.markerList!==prevState.mapMarkers){
      return { mapMarkers: nextProps.markerList};
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markerList!==this.props.markerList){
      this.setState({mapMarkers: this.props.mapMarkers});
      this.drawMarker();
    }
  }

  drawMarker(props) {
    const {mapMarkers} = this.state
    if (window.google){
      const markersArray = window.markersArray
      markersArray.map(oldmarkers => {
        oldmarkers.setMap(null)
      })
      mapMarkers && mapMarkers.map(markerList => {
        let markerCoordinates = {lat: markerList.latitude, lng: markerList.longitude}
        markersArray.push(new window.google.maps.Marker({position: markerCoordinates, map: window.googleMap}));
      })
    }
  }

  initiateMap = () => {
    var googleMap;
    var markersArray=[];
    loadScript(`${Config.googleMapJsUrl}?key=${Config.googleMapClientId}`).then(() => {
      var google = window.google
      var berlin = {lat: 52.52, lng: 13.40};
      googleMap = new google.maps.Map(document.getElementById('map'), {
        center: berlin,
        zoom: 5
      });
      window.googleMap=googleMap
      window.markersArray=markersArray
      this.drawMarker()
    })
  }

  render() {
    const style = {
      width: '50',
      height: '50vh'
    }
    return (
      <div id="map" style={style}>
        loading map...
      </div>
    )
  }
}
