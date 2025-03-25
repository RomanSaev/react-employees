import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import auth from '../features/auth/authSlice'
import employees from '../features/employees/employeesSlice'
import { api } from "./services/api"
import { listenerMiddleware } from "../middleware/auth"

export type RootState = ReturnType<typeof store.getState>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    employees,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware);
  }
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
