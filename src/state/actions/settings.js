export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const setLanguage = (language) => ({
  type: UPDATE_SETTINGS,
  payload: {
    language,
  }
})
