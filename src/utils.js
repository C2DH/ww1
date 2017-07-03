import qs from 'query-string'
import { keys, zipObject, filter, memoize, map, keyBy, isArray, get } from 'lodash'

export const parseQsValue = (location, key, defaultValue = null) => {
  const params = qs.parse(qs.extract(location.search))
  return get(params, key, defaultValue)
}

export const parseQsBooleanValue = (location, key, defaultValue = 1) => {
  return !!parseInt(parseQsValue(location, key, defaultValue))
}

const commaStrToList = memoize((str, defaultValue) => {
  const l = filter(str.split(','))
  if (l.length === 0) {
    return defaultValue
  }
  return l
})

export const parseQsCommaListValue = (location, key, defaultValue = []) => {
  return commaStrToList(parseQsValue(location, key, ''), defaultValue)
}

const commaStrToNumList = memoize((str, defaultValue) => {
  return commaStrToList(str, defaultValue).map(a => +a)
})

export const parseQsCommaNumListValue = (location, key, defaultValue = []) => {
  return commaStrToNumList(parseQsValue(location, key, ''), defaultValue)
}

// From my,name,is,giova to { my: true, name: true, is: true, giova: true }
// util for filtering like stuff
const commaStrToObj = memoize((typesStr, defaultValue) => {
  const l = filter(typesStr.split(','))
  if (l.length === 0) {
    return defaultValue
  }
  return zipObject(l, l.map(_ => true))
})
export const parseQsCommaObjValue = (location, key, defaultValue = {}) => {
  return commaStrToObj(parseQsValue(location, key, ''), defaultValue)
}

export const objToCommaStr = obj => keys(obj).join(',')
