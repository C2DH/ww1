export const GET_STATIC_STORY = 'GET_STATIC_STORY'
export const GET_STATIC_STORY_SUCCESS = 'GET_STATIC_STORY_SUCCESS'
export const GET_STATIC_STORY_LOADING = 'GET_STATIC_STORY_LOADING'
export const GET_STATIC_STORY_FAILURE = 'GET_STATIC_STORY_FAILURE'
export const GET_STATIC_STORY_UNLOAD = 'GET_STATIC_STORY_UNLOAD'

export const loadStaticStory = (idOrSlug) => ({
  type: GET_STATIC_STORY,
  payload: idOrSlug,
})

export const unloadStaticStory = () => ({
  type: GET_STATIC_STORY_UNLOAD,
})
