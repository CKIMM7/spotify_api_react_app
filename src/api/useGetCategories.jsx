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

    const getCategories = () => {
    
    let url = `https://api.spotify.com/v1/browse/categories?limit=9`
      
    axios(url, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then (cat => {
        console.log(cat.data.categories.items)
        dispatch(artsActions.setCategoryArray(cat.data.categories.items))
        console.log('categories api call inside')
    })
    .catch(err => {
        console.log(err)
    })}

    useEffect(() => {
        
        if(textInput === '' && categoryArray.length === 0) {
            console.log('categories api call useEffect')
            getCategories()
        }

    }, [textInput])


    return { getCategories };
}

export default useGetCategories;
