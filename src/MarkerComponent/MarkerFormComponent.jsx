import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Api from '../../src/api.js'

import './MarkerComponent.css'

export default class MarkerFormComponent extends Component {
  static Props = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onMarkerUpdate: PropTypes.func.isRequired,
    onSelectedMarker: PropTypes.object,
    onPopupClose: PropTypes.func.isRequired,
  };

  state = {
    markerEdited: false,
    selectedMarker: null,
    errorMessage: null,
    successMessage: null,
    long_name: '',
  };

  static getDerivedStateFromProps(nextProps, prevState){
    const { onSelectedMarker } = nextProps
    if(prevState.markerEdited == false){
      return { 
        long_name: onSelectedMarker ? onSelectedMarker.long_name : '',
        selectedMarker: onSelectedMarker
      };
    }
    else return null;
  }

  errorMessage = () => {
    const { errorMessage } = this.state
    return (errorMessage && <div className="error-message">
      { errorMessage }
    </div>)
  };

  successMessage = () => {
    const { successMessage } = this.state
    return (successMessage && <div className="success-message">
      { successMessage }
    </div>)
  };

  handleSubmit = () => {
    const {long_name, selectedMarker }= this.state
    if (long_name == ""){
      this.setState({
        errorMessage: "Please enter valid address",
      })
      return 
    }

    let markerApiCall = null;
    if(selectedMarker && selectedMarker.id){
      markerApiCall = Api.updateMarker({id: selectedMarker.id, address: long_name})
    }
    else{
      markerApiCall = Api.createMarker({address: long_name})
    }
    markerApiCall
      .then((res) => {
        if(res.status == "failure")
          {
            this.setState({
              errorMessage: res.message,
            })
          }
        else{
          this.setState({
            successMessage: res.message,
          })
          setTimeout(() => {
            this.props.onMarkerUpdate(res.locations)
            this.handleClose()
          }, 1000)
          
        }
      })
      .catch((res)=>{
        console.log(res)
      })
  };

  handleClose = () => {
    this.setState({
      markerEdited: false,
      errorMessage: null,
      successMessage: null,
      selectedMarker: null,
      long_name: '',
    })
    this.props.onPopupClose()
  };

  handleTextChange = (e) => {
    const long_name = this.state 
    this.setState({
      long_name: e.currentTarget.value,
      markerEdited: true,
      errorMessage: null,
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    const { isActive, onSelectedMarker } = this.props
    const { selectedMarker } = this.state
    return (
      <div className={ isActive ? 'overlay' : 'hide' }>
        <div className="map-form">
          <h3>
            Enter Address
          </h3>
          <span className="map-form__close"><span onClick={ this.handleClose }>X</span></span>
          <div className="map-form__input">
            <input
              autoFocus="true"
              type="text" 
              name="address" 
              placeholder="Address.."
              value={ this.state.long_name }
              onChange={ this.handleTextChange }
              onKeyPress={ this.handleKeyPress }
            />
            <button name="mapSubmit" className="button button--blue button--form-submit" type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
          { this.errorMessage() }
          { this.successMessage() }
        </div>
      </div>)
  }
}

