import userSlice from './userSlice'
import productSlice from './productSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// ✅ Custom storage (fixes getItem/setItem error completely)
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value)
    return Promise.resolve(true)
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'Ecart',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store