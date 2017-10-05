export const SET_PREVIEW_TOKEN = 'SET_PREVIEW_TOKEN'
export const setPreviewToken = token => ({
  type: SET_PREVIEW_TOKEN,
  payload: token,
})

export const CLEAR_PREVIEW_TOKEN = 'CLEAR_PREVIEW_TOKEN'
export const clearPreviewToken = () => ({
  type: CLEAR_PREVIEW_TOKEN,
})
