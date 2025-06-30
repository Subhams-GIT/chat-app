import { configureStore } from '@reduxjs/toolkit'
import Authreducers from '../Context/AuthContext'
import { chatreducers } from '../Context/AuthContext'
export const store = configureStore({
	reducer: {
		Authreducers,
		chatreducers
	},
	devTools: process.env.NODE_ENV !== 'production'
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch