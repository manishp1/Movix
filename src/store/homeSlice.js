import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{},
    genres:{}
  },
  reducers: {
    getApiConfigiration:(state, actions) =>{
        state.url = actions.payload
    },
    getGenres:(state, action) =>{
        state.genres = action.payload
    }
}
})

// Action creators are generated for each case reducer function
export const { getApiConfigiration, getGenres} = homeSlice.actions

export default homeSlice.reducer