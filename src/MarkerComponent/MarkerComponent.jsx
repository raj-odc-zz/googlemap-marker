import React, { Component } from 'react';
import { loadScript } from '../../src/utils'
import Config from '../../src/config.js'
import Api from '../../src/api.js'

import styles from './MarkerComponent.css'
import MapComponent from './../MapComponent/MapComponent.jsx';
import MarkerFormComponent from './MarkerFormComponent.jsx'

export default class MarkerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMarkerFormOpen: false,
      selectedMarker: null,
      mapMarkers: [],
    }
    this.handleAddMarker = this.handleAddMarker.bind(this)
    this.handleEditMarker = this.handleEditMarker.bind(this)    
    this.handleDeleteMarker = this.handleDeleteMarker.bind(this)
    this.handleMarkerUpdate = this.handleMarkerUpdate.bind(this)
    this.updateMarker = this.updateMarker.bind(this)
    this.deleteMarker = this.deleteMarker.bind(this)
    this.handlePopupClose = this.handlePopupClose.bind(this)
  }

  componentDidMount() {
    Api.getLocations()
      .then((res) => {
        this.setState({mapMarkers: res.locations})
      })
      .catch((res)=>{
        console.log(res)
      })
  }

  handleAddMarker() {
    const { isMarkerFormOpen } = this.state
    this.setState({isMarkerFormOpen: true})
  }
  
  handleEditMarker(e){
    const { isMarkerFormOpen, selectedMarker, mapMarkers } = this.state
    const editedMarker = mapMarkers.find(marker => marker.id==e.currentTarget.dataset.id)
    this.setState({isMarkerFormOpen: true, selectedMarker: editedMarker})
  }

  handleDeleteMarker(e){
    const markerId = e.currentTarget.dataset.id
    Api.deleteMarker({id: markerId})
      .then((res) => {
        if(res.status == "failure")
          {
            alert(res.message)
          }
        else{
          alert(res.message)
          this.deleteMarker(markerId)
        }
      })
      .catch((res)=>{
        console.log(res)
      })
  }

  handleMarkerUpdate(newMarker){
    const { mapMarkers } = this.state
    const findMarker = mapMarkers.find(marker => marker.id===newMarker.id)
    if (findMarker){
      this.updateMarker(newMarker)
    }
    else{
      this.setState({
        mapMarkers: [...mapMarkers, newMarker]
      })
    }
  }

  updateMarker(newMarker){
    const newMarkerList = this.state.mapMarkers.map( marker => marker.id === newMarker.id ?
      newMarker : marker
    );
    this.setState({
      mapMarkers: newMarkerList
    })
  }

  deleteMarker(markerId){
    const newMarkerList = this.state.mapMarkers.filter(marker => marker.id!=markerId)
    this.setState({
      mapMarkers: newMarkerList,
      selectedMarker: null,
    })
  }

  handlePopupClose = () => {
    this.setState({
      isMarkerFormOpen: false,
      selectedMarker: null,
    })
  }

  showMarkers() {
    const {mapMarkers} = this.state
    return mapMarkers && mapMarkers.map(markers => {
      return (
        <ul key={markers.id}>
          <li>{markers.long_name}</li>
          <li>{markers.short_name}</li>
          <li>Latitude: {markers.latitude}</li>
          <li>Longitude: {markers.longitude}</li>
          <li>
            <button 
              type="button"
              className="button button--grey" 
              onClick={ this.handleEditMarker } 
              data-id={markers.id}
            >
              Edit
            </button>
            <button 
              type="button" 
              className="button button--grey" 
              onClick={ this.handleDeleteMarker } 
              data-id={markers.id}
            >
              Delete
            </button>
          </li>
      </ul>
    )
    })
  }

  render() {
    const { isMarkerFormOpen, selectedMarker, mapMarkers } = this.state
    return (
      <div className= "location">
        <div className="location__map">
          <MapComponent markerList= { mapMarkers } />
        </div>
        <div className="location__form">
          <MarkerFormComponent
            isActive= { isMarkerFormOpen }
            onClose={ this.handleClose }
            onSelectedMarker= { selectedMarker }
            onMarkerUpdate= { this.handleMarkerUpdate }
            onPopupClose = {this.handlePopupClose }
          />
          <button name="addMap" type="button" className="button button--blue" onClick={ this.handleAddMarker }>Add Map</button>
          <hr size="1"/>
          <div className="location__list">
            {this.showMarkers()}
          </div>
        </div>
      </div>
    )
  }
}
