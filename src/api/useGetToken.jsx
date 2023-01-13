import react, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from '../store/store';
import useSearchArts from './useSearchArts';
import axios from 'axios';

const spotify = {
    ClientId: `df30ea0733bf439bab48367864236b8f`,
    ClientSecret: `2291827d42d842939b4822bacd0c574d`
}

const useGetToken = () => { 
  
    const dispatch = useDispatch();

    useEffect(() => {

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
            //   axios('https://api.spotify.com/v1/browse/categories?locale=sv_US&limit=10', {
            //       method: 'GET',
            //       headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            //     })
            //     .then (categories => {
            //       console.log(categories.data.categories.items)        
            //   });

          })
          .catch(err => console.log(err))
      }

      getToken();

      }, [])

    return;
}

export default useGetToken;
