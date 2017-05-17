// Standard api calls
import request from 'superagent'
const API_URL = '/api'

// Extract only body from response, when other stuff like response
// headers and so on are useless
const extractBody = ({ body }) => body

export const getDocuments = (params = {}) =>
  request.get(`${API_URL}/document`)
    .query(params)
    .then(extractBody)
