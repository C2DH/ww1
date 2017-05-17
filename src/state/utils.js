import { map, keyBy, isArray } from 'lodash'

export const normalizeCollection = (collection, byKey = 'id') => ({
  ids: map(collection, byKey),
  data: keyBy(collection, byKey),
})


export const arrayze = a => (isArray(a) ? a : [a])
