export const GET_CHAPTER = 'GET_CHAPTER'
export const GET_CHAPTER_SUCCESS = 'GET_CHAPTER_SUCCESS'
export const GET_CHAPTER_LOADING = 'GET_CHAPTER_LOADING'
export const GET_CHAPTER_FAILURE = 'GET_CHAPTER_FAILURE'
export const GET_CHAPTER_UNLOAD = 'GET_CHAPTER_UNLOAD'

export const loadChapter = (idOrSlug) => ({
  type: GET_CHAPTER,
  payload: idOrSlug,
})

export const unloadChapter = () => ({
  type: GET_CHAPTER_UNLOAD,
})
