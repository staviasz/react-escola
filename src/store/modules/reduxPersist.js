import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistConfig = persistReducer(
    {
      key: 'ESCOLA-API',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
  return persistConfig;
};
