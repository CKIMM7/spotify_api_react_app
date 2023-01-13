import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from '../../store/store';
import useSearchArts from '../../api/useSearchArts';
import { useNavigate } from 'react-router-dom';


export default function SearchForm() {

    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.cart.textInput)
    const searchValue = useSelector((state) => state.cart.searchValue);
    const navigate = useNavigate()

    function handleChange (e) {
        dispatch(artsActions.setTextInput(e.target.value))
    }

    function handleSumbit(e) {
        e.preventDefault();
        dispatch(artsActions.setSearchValue(textInput))
    }

  return (
      <form onSubmit={handleSumbit} id="searchForm">
              {/* <label htmlFor="form-search">Search For Artists</label> */}
              <input name={searchValue} type='text' value={textInput} onChange={handleChange} id="form-search" placeholder='Type in username'/>

              {/* <input type='submit' id='button'/> */}
          </form>
  )
}
