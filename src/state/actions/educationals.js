export const GET_EDUCATIONALS = 'GET_EDUCATIONALS'
export const GET_EDUCATIONALS_SUCCESS = 'GET_EDUCATIONALS_SUCCESS'
export const GET_EDUCATIONALS_LOADING = 'GET_EDUCATIONALS_LOADING'
export const GET_EDUCATIONALS_FAILURE = 'GET_EDUCATIONALS_FAILURE'
export const GET_EDUCATIONALS_UNLOAD = 'GET_EDUCATIONALS_UNLOAD'

export const loadEducationals = () => ({
  type: GET_EDUCATIONALS,
})

export const unloadEducationals = () => ({
  type: GET_EDUCATIONALS_UNLOAD,
})

export const GET_EDUCATIONAL = 'GET_EDUCATIONAL'
export const GET_EDUCATIONAL_SUCCESS = 'GET_EDUCATIONAL_SUCCESS'
export const GET_EDUCATIONAL_LOADING = 'GET_EDUCATIONAL_LOADING'
export const GET_EDUCATIONAL_FAILURE = 'GET_EDUCATIONAL_FAILURE'
export const GET_EDUCATIONAL_UNLOAD = 'GET_EDUCATIONAL_UNLOAD'

export const loadEducational = (idOrSlug) => ({
  type: GET_EDUCATIONAL,
  payload: idOrSlug,
})

export const unloadEducational = () => ({
  type: GET_EDUCATIONAL_UNLOAD,
})
