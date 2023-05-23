import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistConfig = persistReducer(
    {
      key: 'NOME_DA_APLICACAO',
      storage,
      whitelist: ['example'],
    },
    reducers
  );
  return persistConfig;
};
