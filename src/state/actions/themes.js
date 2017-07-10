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

export const GET_THEME = 'GET_THEME'
export const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS'
export const GET_THEME_LOADING = 'GET_THEME_LOADING'
export const GET_THEME_FAILURE = 'GET_THEME_FAILURE'
export const GET_THEME_UNLOAD = 'GET_THEME_UNLOAD'

export const loadTheme = (idOrSlug) => ({
  type: GET_THEME,
  payload: idOrSlug,
})

export const unloadTheme = () => ({
  type: GET_THEME_UNLOAD,
})
