import config from "./config";
export default {
  getLocations: () => {
    return fetch(`${config.baseServerUrl}/v1/locations`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error));
  },

  createMarker: (params) => {
    return fetch(`${config.baseServerUrl}/v1/locations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
  },

  getMarker: (params) => {
    let markerId = params.id
    return fetch(`${config.baseServerUrl}/v1/locations/${markerId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
  },

  updateMarker: (params) => {
    let markerId = params.id
    return fetch(`${config.baseServerUrl}/v1/locations/${markerId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
  },

  deleteMarker: (params) => {
    let markerId = params.id
    return fetch(`${config.baseServerUrl}/v1/locations/${markerId}`, {method: 'DELETE'})
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
  }
}