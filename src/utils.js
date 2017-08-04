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

export const makeOverlaps = y => {
  // it's hot today, in a perfect world it would be correct
  // to use lte gte stuff
  // but it's hot today when <year i suppose 0 the jesus birthday
  // when year> i suppose 2099 i'll be dead or i'll be a robot
  const numerize = year => {
    if (typeof year === 'number') {
      return year
    }
    if (year.charAt(0) === '<') {
      return 0
    } else if (year.charAt(year.length - 1) === '>') {
      return 2099
    }
    return year
  }
  const yy = isArray(y) ? y.map(numerize) : undefined
  return yy ? `${yy[0]}-01-01,${yy[1] - 1}-12-31` : undefined
}

export const objToCommaStr = obj => keys(obj).join(',')

export const getThemeCover = theme =>
  get(theme, 'covers[0].attachment')

const PLACE_TYPE_ICONS = {
  bombing: {
    class: 'material-icons',
    content: 'alarm_add'
  },
  hospital: {
    class: 'material-icons',
    content: 'favorite_border'
  },
  // ...
}
export const getPlaceTypeIcon = placeType => {
  const icon = PLACE_TYPE_ICONS[placeType]
  if (typeof icon === 'undefined') {
    return {
      class: 'material-icons',
      content: 'alarm_add'
    }
  }
  return icon
}
