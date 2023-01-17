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

    const categoryArray = useSelector((state) => state.cart.categoryArray);

    const getCategories = (url) => {
    
      
    axios(url, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then (cat => {
        console.log(cat)
        //dispatch(artsActions.setCategoryArray(cat.data.categories.items))
        console.log('categories api call inside')
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
