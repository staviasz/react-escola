import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.LOGIN_USER_FAILURE: {
      return state;
    }
    case types.LOGIN_USER_REQUEST: {
      return state;
    }
    default:
      return state;
  }
}
