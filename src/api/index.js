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

export const getMapDocuments = (params = {}) =>
  getDocuments({
    filters: JSON.stringify({
      'data__coordinates__isnull': false,
      ...params.filters
    }),
    ...params,
  })

export const getTimelineDocuments = () =>
  getDocuments({
    filters: JSON.stringify({
      'data__type': 'event',
    }),
  })

export const getDocument = (id) =>
  request.get(`${API_URL}/document/${id}`)
    .then(extractBody)
