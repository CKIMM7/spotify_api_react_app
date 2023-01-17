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
      categoryArray: [],

      newReleaseArray: [],
      global50Array: [],

      isLoading: false,
      isError: false,
      error: {},
      modal: false,
      toggle: false
  },
  reducers: {

    setNewReleaseArray(state, action) {
      console.log(action.payload)
      state.newReleaseArray = action.payload;
    },

    setGlobal50Array(state, action) {
      console.log(action.payload)
      state.global50Array = action.payload;
    },

    setCategoryArray(state, action) {
      state.categoryArray = action.payload;
    },
    
    setAlbumArray(state, action) {
      console.log(action.payload)
      state.albumArray = action.payload;
    },

    setSearchArray(state, action) {
      console.log(action.payload)
      state.searchArray = action.payload
    },

    setToken(state, action) {
      console.log(action.payload)
      state.token = action.payload;
    },


    setToggle(state, action) {
      state.toggle = action.payload;
    },

    setModal(state, action) {
      state.modal = action.payload;
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
    }

  },
});

export const artsActions = artsSlice.actions;

export default artsSlice;
