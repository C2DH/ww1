export const GET_THEMES = 'GET_THEMES'
export const GET_THEMES_SUCCESS = 'GET_THEMES_SUCCESS'
export const GET_THEMES_LOADING = 'GET_THEMES_LOADING'
export const GET_THEMES_FAILURE = 'GET_THEMES_FAILURE'
export const GET_THEMES_UNLOAD = 'GET_THEMES_UNLOAD'

export const loadThemes = () => ({
  type: GET_THEMES,
})

export const unloadThemes = () => ({
  type: GET_THEMES_UNLOAD,
})
