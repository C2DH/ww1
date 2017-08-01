import matchMedia from 'matchmedia'

const breakpoints = {
  md: 991,
}

export const isMobileScreen = () =>
  matchMedia(`screen and (max-width: ${breakpoints.md}px)`).matches

export default breakpoints
