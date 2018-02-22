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

export const mergeQs = (location, o) =>
  // New search merge current qs with new object as qs...
  qs.stringify({
    ...qs.parse(qs.extract(location.search)),
    ...o,
  })

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

export const getThemeCover = theme => {
  const image = get(theme, 'covers[0].attachment')
  const bbox = get(theme, 'data.background.bbox', [])
  const imageUrl = bbox.length?getBoundingBoxImage(image, bbox):get(theme, 'covers[0].data.resolutions.medium.url')
  return imageUrl
}

const PLACE_TYPE_ICONS = {
  bombing: {
    class: 'iconmap-bombing',
    content: ''
  },
  hospital: {
    class: 'iconmap-hospital',
    content: ''
  },
  shelter: {
    class: 'iconmap-shelter',
    content: ''
  },
  'steel-plant': {
    class: 'iconmap-steel-plant',
    content: ''
  },
  cemetery: {
    class: 'iconmap-cemetery',
    content: ''
  },
  memorial: {
    class: 'iconmap-memorial',
    content: ''
  },
  'railway-station': {
    class: 'iconmap-railway-station',
    content: ''
  },
  'administrative-building': {
    class: 'iconmap-administrative-building',
    content: ''
  },
  'army-camp': {
    class: 'iconmap-army-camp',
    content: ''
  }
}
export const getPlaceTypeIcon = placeType => {
  const icon = PLACE_TYPE_ICONS[placeType]
  if (typeof icon === 'undefined') {
    return {
      class: 'iconmap-others',
      content: ''
    }
  }
  return icon
}

const appendBeforeExtension = (file, str) => {
  const pieces = file.split('.')
  return pieces.slice(0, -1).join('.') + `${str}.` + pieces.slice(-1)
}

export const getBoundingBoxImage = (imageUrl, bbox) => {
  if (isArray(bbox) && bbox.length === 4) {
    return appendBeforeExtension(imageUrl, `_c[${bbox.join(',')}]`)
  }
  return imageUrl
}
