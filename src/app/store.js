import alertsReducer from '../features/alert/alertSlice';
import userReducer from '../features/user/userSlice';


import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  alerts: alertsReducer,
  user: userReducer,
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}


// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     alerts: alertsReducer,
//     user: userReducer,
//   },
// });
