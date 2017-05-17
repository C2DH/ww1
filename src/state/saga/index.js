import { fork } from 'redux-saga/effects'
import * as api from '../../api'
import makePaginateCollection from './hoc/paginateCollection'
import { GET_DOCUMENTS } from '../actions'

export default function* rootSaga() {
  yield fork(makePaginateCollection(
    GET_DOCUMENTS,
    api.getDocuments,
    state => state.documents
  ))
}
