import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "@/slices/root"
import { rootServices } from "@/services/root"

const persistConfig = {
  key: "modi",
  version: 1,
  storage,
  blacklist: [rootServices.reducerPath],
  whitelist: [],
}

const reducers = combineReducers({
  ...rootReducer,
  [rootServices.reducerPath]: rootServices.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const setupStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootServices.middleware),
  })

export const store = setupStore()

setupListeners(store.dispatch)

export const persistor = persistStore(store)

// biome-ignore lint/style/useNamingConvention: <explanation>
export type RootState = ReturnType<typeof reducers>
// biome-ignore lint/style/useNamingConvention: <explanation>
export type AppStore = ReturnType<typeof setupStore>

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch
