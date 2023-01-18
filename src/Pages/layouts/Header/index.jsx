import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


import LoadingSpinner from "../../LoadingSpinner";
import SearchForm from "../../Forms";

import Categories from "../../Categories";


const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.cart.isLoading);
    const isError = useSelector((state) => state.cart.isError);
    const error = useSelector((state) => state.cart.error);
    
    const searchArray = useSelector(state => state.cart.searchArray)
    const textInput = useSelector((state) => state.cart.textInput);


    useEffect(() => {

    }, [textInput])

    useEffect(() => {

    }, [location.pathname])

    const homeHandler = () => {
      navigate('/')
    }

    const togleThemeHandler = () => {
      document.body.classList.toggle('dark-theme')
    }


    return(
      <>
        <div className='title'>
          <img src='https://student-server-bucket.s3.amazonaws.com/Spotify_icon.svg.png'
          onClick={()=> { homeHandler() }}
          ></img>
          <h1
          onClick={()=> { homeHandler() }}>SPOTIFY REACT APP</h1>
          <img
        onClick={()=> { togleThemeHandler() }} 
        src='https://student-server-bucket.s3.amazonaws.com/dark_theme.png'
        id='dark-theme'
        >
        </img>
        </div>
        <div className='nav-search'>    
          <SearchForm />
        </div> 



        {!textInput && !isLoading && <Categories></Categories> }
        {isLoading && textInput && <LoadingSpinner />}
          <Outlet></Outlet>

    </>
    )
}

export default Header
