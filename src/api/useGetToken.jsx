import react, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from '../store/store';
import useSearchArts from './useSearchArts';
import axios from 'axios';

const useGetToken = () => { 
  
    const dispatch = useDispatch();

    function getToken () {
      axios('https://accounts.spotify.com/api/token', {
      headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(import.meta.env.VITE_CLIENTID + ':' + import.meta.env.VITE_CLIENTSECRET)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        
        .then(tokenResponse => {
            dispatch(artsActions.setToken(tokenResponse.data.access_token))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {

      getToken();

      }, [])

    return;
}

export default useGetToken;
