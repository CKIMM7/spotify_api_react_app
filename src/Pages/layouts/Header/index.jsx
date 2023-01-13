import React, { useEffect } from "react";
import { useParams , NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from "../../../store/store";

import LoadingSpinner from "../../LoadingSpinner";
import SearchForm from "../../Forms";

import useGetToken from "../../../api/useGetToken";
import useSearchArts from "../../../api/useSearchArts";

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


    return( 
        <>
        <h1>GITHUB REPO SEARCH ENGINE</h1>
        <nav id='nav'>  
          <SearchForm />
        </nav> 
        {!textInput && !isLoading && <img src='https://student-server-bucket.s3.amazonaws.com/github_logo.png' /> }
        {isLoading && textInput && <LoadingSpinner />}
          <Outlet></Outlet>
    </>
    )
}

export default Header
