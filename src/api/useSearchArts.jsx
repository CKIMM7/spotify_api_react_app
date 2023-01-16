import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";

const useSearchArts = (artist) => {

    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const dispatch = useDispatch()
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

        console.log(textInput)

        let url = `https://api.spotify.com/v1/search?q=${textInput? textInput : artist}&type=artist&limit=3`;

        if(artistId)
        url = `https://api.spotify.com/v1/artists/${artistId}/albums?offset=0&limit=5`

        console.log(`artistId`)
        console.log(artistId)

        const controller = new AbortController();
        const { signal } = controller;

        console.log(searchValue)
        axios(url, { method: 'GET', headers: { 'Authorization' : 'Bearer ' + token}})
        .then(data => { 
            console.log(data)
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))

            //store data in redux
            artistId ? dispatch(artsActions.setAlbumArray(data.data.items)) : dispatch(artsActions.setSearchArray(data.data.artists.items))

            // if(!param.get("artistname")) navigate(`artist?artistname=${textInput}`) 
            // else return;

            if(textInput !== param.get("artistname")) navigate(`artist?artistname=${textInput}`)

            //handle routing

            if(artistId) {
                navigate(`${location.pathname}${location.search}&album=${artistId}`)
            }  
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
            //console.log(window.location)
            if(textInput) getArists() 
            else return;   
            //getArists() 
        
            }}, 1000);

        return () => { 
            console.log('comp unmount')
            clearTimeout(timeOutId);}    

    }, [textInput])

    return { isError, error, searchValue, getArists };
}

export default useSearchArts;
