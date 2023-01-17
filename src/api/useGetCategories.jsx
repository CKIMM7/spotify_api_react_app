import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { artsActions } from "../store/store";
import axios from "axios"

  const useGetCategories = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const textInput = useSelector((state) => state.cart.textInput);
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const newReleaseArray = useSelector((state) => state.cart.newReleaseArray);
    const global50Array = useSelector((state) => state.cart.global50Array);

    const getCategories = (url, type) => {
      
    axios(url, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(data => {
        console.log(data)
        //dispatch(artsActions.setCategoryArray(cat.data.categories.items))
        console.log('categories api call inside')
        if(type === 1) dispatch(artsActions.setNewReleaseArray(data.data.albums.items))

        if(type === 2) dispatch(artsActions.setGlobal50Array(data.data.tracks.items))
 
    })
    .catch(err => {
        console.log(err)
    })}

    useEffect(() => {
        console.log('categories api call useEffect')    
        if(token) {
            //console.log('categories api call useEffect')
            getCategories(`https://api.spotify.com/v1/browse/new-releases?limit=9`, 1)
            getCategories(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`, 2)
        }

    }, [token])


    return { getCategories };
}

export default useGetCategories;
