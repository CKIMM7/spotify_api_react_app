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

    useEffect(() => {
        dispatch(artsActions.setIsLoading(true))
        setIsError(false)
        setError({})

        const controller = new AbortController();
        const { signal } = controller;

        function callGitHub () {

        console.log(searchValue)
        axios(`https://api.spotify.com/v1/search?q=${textInput? textInput : artist}&type=artist&limit=3`, 
        { method: 'GET', headers: { 'Authorization' : 'Bearer ' + token}})
        .then(data => { 

            dispatch(artsActions.setSearchArray(data.data.artists.items))
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))
        })
        .catch((err)=> {
            console.log(err)
            dispatch(artsActions.setIsLoading(false))
            //signal.aborted happens when controller.abort() gets called
            //by the user therefore do not need to return the err msg
            if(signal.aborted) return;
            dispatch(artsActions.setIsError(true))
            dispatch(artsActions.setError({ message: err.message }))
        })
    }

        const timeOutId = setTimeout(() => {
            if(!textInput) {
            
            //init all
            dispatch(artsActions.setSearchArray([]))
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))  

            } else {    
            callGitHub()
            //navigate(`artist/${textInput}`);
            navigate(`artist?artistname=${textInput}`);  
            }

        }
        , 1000);


        return () => { 
            console.log('comp unmount')

            clearTimeout(timeOutId);}    

    }, [textInput])

    return { isError, error, searchValue };
}

export default useSearchArts;
