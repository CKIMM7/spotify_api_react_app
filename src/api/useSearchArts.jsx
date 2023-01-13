import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";
import { useNavigate } from "react-router-dom";


const useSearchArts = (artist) => {

    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const dispatch = useDispatch()

    const searchValue = useSelector((state) => state.cart.searchValue);
    const textInput = useSelector((state) => state.cart.textInput);
    const token = useSelector((state) => state.cart.token);
    let url;

    function getArists () {
        let url = `https://api.spotify.com/v1/search?q=${textInput? textInput : artist}&type=artist&limit=3`;

        //if(albumSearch)
        //url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=5`

        const controller = new AbortController();
        const { signal } = controller;

        dispatch(artsActions.setIsLoading(true))
        setIsError(false)
        setError({})

        console.log(searchValue)
        axios(url, { method: 'GET', headers: { 'Authorization' : 'Bearer ' + token}})
        .then(data => { 

            //!albumSearch : dispatch(artsActions.setSearchArray(data.data.artists.items)) ? dispatch(artsActions.setAlbumArray(data.data.artists.items))   
            dispatch(artsActions.setSearchArray(data.data.artists.items))


            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))
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
            getArists()
            navigate(`artist?artistname=${textInput}`);  
            }}, 1000);

        return () => { 
            console.log('comp unmount')
            clearTimeout(timeOutId);}    

    }, [textInput])

    return { isError, error, searchValue };
}

export default useSearchArts;
