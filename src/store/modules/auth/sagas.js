import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

// eslint-disable-next-line require-yield
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Login realizado com sucesso');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persistRequest({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { idStorage, nome, email, senha } = payload;

  try {
    if (idStorage) {
      yield call(axios.put, '/users/', {
        email,
        nome,
        senha: senha || undefined,
      });
      toast.success('Atualização realizada com sucesso');
      yield put(actions.registerUpdatedSuccess(payload));
    } else {
      yield call(axios.post, '/users/', {
        email,
        nome,
        senha,
      });
      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSuccess(payload));
      history.push('/login');
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa refazer o login');
      yield put(actions.loginFailure());
      return history.push('/login');
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
