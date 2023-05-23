import { call, put, all, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(actions.clicaBotaoSucces());
  } catch {
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.LOGIN_USER_REQUEST, exampleRequest)]);
