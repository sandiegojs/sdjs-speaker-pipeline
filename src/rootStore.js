import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let rootStore = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store)
  return { rootStore, persistor }
}