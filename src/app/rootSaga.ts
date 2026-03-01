import { all, fork } from 'redux-saga/effects';
import { watchAuthSagas } from '../features/auth/authSaga';

// Root saga — forks all feature watcher sagas concurrently
export function* rootSaga() {
  yield all([
    fork(watchAuthSagas),
    // Add more feature sagas here
  ]);
}
