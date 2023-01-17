import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { artsActions } from "../store/store";
import axios from "axios"

  const useGetAlbums = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const textInput = useSelector((state) => state.cart.textInput);
    const toggle = useSelector((state) => state.cart.toggle);

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let id = params.artistname;

    const getAlbums = (id) => {
  
      let url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=5`
      
      if(id) axios(url, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then (albums => {
          console.log(albums)
          dispatch(artsActions.setAlbumArray(albums.data.items))


          console.log('how many navigate')

        })
        .catch(err => {
          console.log(err)
        })

      
    }

    useEffect(() => {
      console.log(toggle)
      if(toggle) getAlbums()
    

    }, [toggle])


    return { getAlbums };
}

export default useGetAlbums;
