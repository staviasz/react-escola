import * as types from '../types';

export function clicaBotaoRequest() {
  return {
    type: types.LOGIN_USER_REQUEST,
  };
}

export function clicaBotaoSucces() {
  return {
    type: types.LOGIN_USER_SUCCESS,
  };
}
export function clicaBotaoFailure() {
  return {
    type: types.LOGIN_USER_FAILURE,
  };
}
