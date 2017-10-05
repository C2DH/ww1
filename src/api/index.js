// Standard api calls
import request from 'superagent'
import { omit } from 'lodash'
const API_URL = '/api'

// Extract only body from response, when other stuff like response
// headers and so on are useless
const extractBody = ({ body }) => body

// Inject preview atuh token in request an set no cache!
export const withPreviewToken = token => baseRequest => {
  if (token) {
    return baseRequest
      .set('Authorization', `Bearer ${token}`)
      .query({ nocache: true })
  }
  return baseRequest
}

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

export const suggestDocuments = (term) =>
  request.get(`${API_URL}/document/suggest/`)
    .query({ q: term })
    .then(extractBody)

export const getDocuments = (params = {}) =>
  request.get(`${API_URL}/document/`)
    .query(buildMillerParams(params))
    .then(extractBody)

export const getCollectionDocuments = (params = {}) => getDocuments({
  ...params,
  filters: {
    data__type__in: ['image', 'audio', 'video', 'correspondence', 'other', 'physical object'],
    ...params.filters,
  },
})

export const getMapDocuments = (params = {}) => getDocuments({
  ...params,
  filters: {
    data__coordinates__isnull: false,
    ...params.filters,
  },
})

export const getTimelineDocuments = (params = {}) => getDocuments({
  ...params,
  filters: {
    data__type: 'event',
    ...params.filters,
  },
  orderby: 'data__date',
})

export const getResourceDocuments = (params = {}) => getDocuments({
  filters: {
    data__type: 'resource',
    ...params.filters,
  },
})

export const getDocument = (id) =>
  request.get(`${API_URL}/document/${id}`)
    .then(extractBody)

export const getThemes = (token) =>
  withPreviewToken(token)(
    request.get(`${API_URL}/story/`)
      .query(buildMillerParams({
        filters: {
          tags__slug: 'theme',
        },
        orderby: 'priority',
      }))
  )
  .then(extractBody)

export const getTheme = (idOrSlug, token) =>
  withPreviewToken(token)(
    request
      .get(`${API_URL}/story/${idOrSlug}/`)
      .query({ 'giova': 'misa misa' })
  )
  .then(extractBody)

export const getChapter = (idOrSlug, token) =>
  withPreviewToken(token)(
    request.get(`${API_URL}/story/${idOrSlug}/`)
      .query({
        parser: 'yaml',
      })
  )
  .then(extractBody)

export const getStaticStory = (idOrSlug) =>
  request.get(`${API_URL}/story/${idOrSlug}/`)
    .then(extractBody)
