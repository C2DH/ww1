// Standard api calls
import request from 'superagent'
const API_URL = '/api'

// Extract only body from response, when other stuff like response
// headers and so on are useless
const extractBody = ({ body }) => body

const buildMillerParams = (params) => {
  let newParams = params

  if (newParams.filters && typeof newParams.filters !== 'string') {
    newParams = { ...newParams, filters: JSON.stringify(newParams.filters) }
  }

  if (newParams.exclude && typeof newParams.exclude !== 'string') {
    newParams = { ...newParams, exclude: JSON.stringify(newParams.exclude) }
  }

  return newParams
}

export const getDocuments = (params = {}) =>
  request.get(`${API_URL}/document/`)
    .query(buildMillerParams(params))
    .then(extractBody)

export const getCollectionDocuments = (params = {}) => getDocuments({
  exclude: { data__type__in: ['person', 'event', 'glossary', 'place'] },
  ...params,
})

export const getMapDocuments = (params = {}) => getDocuments({
  filters: {
    data__coordinates__isnull: false,
    ...params.filters,
  },
  ...params,
})

export const getTimelineDocuments = (params = {}) => getDocuments({
  filters: {
    data__type: 'event',
    ...params.filters,
  },
  orderby: 'data__date',
  ...params,
})

export const getDocument = (id) =>
  request.get(`${API_URL}/document/${id}`)
    .then(extractBody)

export const getThemes = () =>
  request.get(`${API_URL}/story/`)
    .query(buildMillerParams({
      filters: {
        tags__slug: 'theme',
      },
      orderby: 'priority',
    }))
    .then(extractBody)
