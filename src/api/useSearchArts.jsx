import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";

const useSearchArts = (nothing) => {
    console.log(nothing);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();

    const searchValue = useSelector((state) => state.cart.searchValue);
    const searchArray = useSelector((state) => state.cart.searchArray);
    const textInput = useSelector((state) => state.cart.textInput);
    const token = useSelector((state) => state.cart.token);
    let url;
    let param = new URLSearchParams(location.search);

    const getArists = (artistId) => {
        dispatch(artsActions.setIsLoading(true))
        setIsError(false)
        setError({})

        let url = `https://api.spotify.com/v1/search?q=${textInput}&type=artist&limit=3`;

        if(artistId)
        url = `https://api.spotify.com/v1/artists/${artistId}/albums?offset=0&limit=5`

        const controller = new AbortController();
        const { signal } = controller;

        console.log(searchValue)
        axios(url, { method: 'GET', headers: { 'Authorization' : 'Bearer ' + token}})
        .then(data => { 
            console.log(data)
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))

            //store data in redux
            dispatch(artsActions.setSearchArray(data.data.artists.items))
                

            if(textInput !== param.get("artistname")) navigate(`artist?artistname=${textInput}`)

            //handle routing
        })
        .catch((err)=> {
            console.log(err)
            dispatch(artsActions.setIsLoading(false))

            if(signal.aborted) return;
            dispatch(artsActions.setIsError(true))
            dispatch(artsActions.setError({ message: err.message }))
        })
    }

    useEffect(() => {

        const timeOutId = setTimeout(() => {
            if(!textInput) {
            
            //init all
            dispatch(artsActions.setSearchArray([]))
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))  

            } else {

            console.log(location)
            getArists() 

        
            }}, 1000);

        return () => { 
            console.log('comp unmount')
            clearTimeout(timeOutId);}    

    }, [textInput])

    return { isError, error, searchValue, getArists };
}

export default useSearchArts
