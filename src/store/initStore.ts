import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'

interface IGamesData {
  data: any,
  meta: any,
}

export const gamesDataInitState: IGamesData = {
  data: null,
  meta: null,
}

const gamesDataSlice = createSlice({
  name: 'gameData',
  initialState: gamesDataInitState,
  reducers: {
    recordData: (state, payload: any) => {
      const {count, next, previous, results} = payload.data;

      state.data = results;
      state.meta = {
        count,
        next,
        previous
      }
    },
  }
})

const combinedReducers = combineReducers({
  gamesData: gamesDataSlice.reducer,
})

export const {recordData} = gamesDataSlice.actions;

export const store = configureStore({
  reducer: combinedReducers,
})

// Can still subscribe to the store
// console.log(store.getState())
