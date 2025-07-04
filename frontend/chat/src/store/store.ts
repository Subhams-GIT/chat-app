import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Authreducers from '../Context/AuthContext'
import { chatreducers } from '../Context/AuthContext'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['Authreducers', 'chatreducers'], // reducers you want to persist
};

const rootreducer = combineReducers({
	Authreducers,
	chatreducers
})

const persistedReducer = persistReducer(persistConfig, rootreducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // recommended for redux-persist
		}),
})
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch