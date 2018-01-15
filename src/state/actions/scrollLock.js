export const LOCK_SCROLL = 'LOCK_SCROLL'
export const UNLOCK_SCROLL = 'UNLOCK_SCROLL'

export const lockScroll = (time) => ({
  type: LOCK_SCROLL,
  payload: { time }
})

export const unlockScroll = () => ({
  type: UNLOCK_SCROLL,
})
