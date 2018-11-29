import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  whitelist: ['AdminLogin'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      promiseMiddleware(),
    ),
  ),
);
export const persistor = persistStore(store);
export default { store, persistor };
/* eslint-enable */
