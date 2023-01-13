import { useState, useEffect } from "react";
import { getGitUserAxiosRest } from "./gitAxios";
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";
import axios from "axios";


const useGetRepos = () => {

    const [results, setResults] = useState([])
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(artsActions.setIsLoading(true))
        setIsError(false)
        setError({})

        const controller = new AbortController();
        const { signal } = controller;
    
        axios.get('https://api.github.com/users/ckimm7/repos')
        .then(data => { 
            dispatch(artsActions.setUserRepos(data.data))

        })
        .catch((err)=> {
            dispatch(artsActions.setIsLoading(false))
            //signal.aborted happens when controller.abort() gets called
            //by the user therefore do not need to return the err msg
            if(signal.aborted) return;
            setIsError(true)
            setError({ message: err.message })
        })


        return () => controller.abort();    

    }, [])

    return { isError, error, results };
}

export default useGetRepos;
