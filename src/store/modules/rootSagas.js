import { all } from 'redux-saga/effects';

import example from './example/sagas';

export default function* rootSagas() {
  return yield all([example]);
}
