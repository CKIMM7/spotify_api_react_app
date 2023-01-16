import { createSlice } from '@reduxjs/toolkit';

const artsSlice = createSlice({
  name: 'arts',
  initialState: {
      token: '',
      userRepos: [],
      artistImage: '',
      searchValue: '',
      textInput: '' ,
      searchArray: [],
      albumArray: [],
      isLoading: false,
      isError: false,
      error: {}
  },
  reducers: {

    setAlbumArray(state, action) {
      console.log(action.payload)
      state.albumArray = action.payload;
    },

    setToken(state, action) {
      console.log(action.payload)
      state.token = action.payload;
    },


    setUserRepos(state, action) {
      state.userRepos = action.payload;
    },

    setIsLoading(state, action) {
      //console.log(action.payload)
      state.isLoading = action.payload
    },

    setIsError(state, action) {
      //console.log(action.payload)
      state.isError = action.payload
    },

    setError(state, action) {
      //console.log(action.payload)
      state.error = action.payload
    },

    setTextInput(state, action) {
      state.textInput = action.payload
    },
  
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },

    setSearchArray(state, action) {
      console.log(action.payload)
      state.searchArray = action.payload
    },



  },
});

export const artsActions = artsSlice.actions;

export default artsSlice;
