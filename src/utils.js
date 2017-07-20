import qs from 'query-string'
import { keys, zipObject, filter, map, keyBy, isArray, get } from 'lodash'
import { defaultMemoize } from 'reselect'

export const parseQsValue = (location, key, defaultValue = null) => {
  const params = qs.parse(qs.extract(location.search))
  return get(params, key, defaultValue)
}

export const parseQsBooleanValue = (location, key, defaultValue = 1) => {
  return !!parseInt(parseQsValue(location, key, defaultValue))
}

const commaStrToList = defaultMemoize((str, defaultValue) => {
  const l = filter(str.split(','))
  if (l.length === 0) {
    return defaultValue
  }
  return l
})

export const parseQsCommaListValue = (location, key, defaultValue = []) => {
  return commaStrToList(parseQsValue(location, key, ''), defaultValue)
}

const commaStrToNumList = defaultMemoize((str, defaultValue) => {
  return commaStrToList(str, defaultValue).map(a => +a)
})

export const parseQsCommaNumListValue = (location, key, defaultValue = []) => {
  return commaStrToNumList(parseQsValue(location, key, ''), defaultValue)
}

// From my,name,is,giova to { my: true, name: true, is: true, giova: true }
// util for filtering like stuff
const commaStrToObj = defaultMemoize((typesStr, defaultValue) => {
  const l = filter(typesStr.split(','))
  if (l.length === 0) {
    return defaultValue
  }
  return zipObject(l, l.map(_ => true))
})
const emptyObj = {}
export const parseQsCommaObjValue = (location, key, defaultValue = emptyObj) => {
  return commaStrToObj(parseQsValue(location, key, ''), defaultValue)
}

export const makeOverlaps = y => y ? `${y[0]}-01-01,${y[1] - 1}-12-31` : undefined

export const objToCommaStr = obj => keys(obj).join(',')

export const getThemeCover = theme =>
  get(theme, 'covers[0].attachment')

const PLACE_TYPE_ICONS = {
  bombing: 'fa-bomb',
  // ...
}
export const getPlaceTypeIcon = placeType => {
  const icon = PLACE_TYPE_ICONS[placeType]
  if (typeof icon === 'undefined') {
    return 'fa-bom'
  }
  return icon
}
