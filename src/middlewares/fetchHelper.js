import fetch from 'isomorphic-fetch'
import actionTypes from '../constants/actionTypes'


/*
  config: {
    url: 'http://',
    requestPath: /home/id,
    parameter: {customer: 123, id: 0},
    arguments: {
      method: 'POST',
      body: JSON.stringify({
        'phone': phone,
        'password': password
      })
    },
    failCallback: function(){}
  }
*/

export default function fetchHelper(config, dispatch) {
  let fullUrl = ''
  if (config.url) {
    fullUrl = config.url
  } else {
    fullUrl = __API_SERVER__ + config.requestPath
  }

  if (config.parameter) {
    let paramsString = ''
    for (let i in config.parameter) {
      if (config.parameter[i] !== undefined && config.parameter[i] !== null) {
        paramsString += ( i + '=' + config.parameter[i] + '&')
      }
    }
    config.parameter = paramsString
  } else {
    config.parameter = ''
  }

  let splitKey = '?'
  if (fullUrl.indexOf('?') != -1) {
    splitKey = '&'
  }
  fullUrl += (config.parameter ? splitKey + config.parameter : '')

  return fetch(fullUrl, Object.assign(config.arguments || {}, {'credentials': 'include'}))
    .then(response => {
      if (!response.ok) {
        if (config.failCallback) {
          config.failCallback(response.json())
        } else if (response.status === 401) {
          dispatch({
            type: actionTypes.SET_USER,
            data: null
          })
        } else if (response.status === 404 ) {
          return Promise.reject({
            type: response.status,
            reason: response.statusText,
            response: {}
          })
        }

        return Promise.reject({
          type: response.status,
          reason: response.statusText,
          response: response.json() 
        })
      }

      return response.json()
    })
}