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

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let album = params.album;

    const getAlbums = (id, artistName) => {
  
      let url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=5`
    
      axios(url, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then (albums => {
          dispatch(artsActions.setAlbumArray(albums.data.items))
          dispatch(artsActions.setModal(true))

          navigate(`/artist?artistname=${textInput ? textInput : artistName}&album=${id}`)




        })
        .catch(err => {
          console.log(err)
        })     
    }

    useEffect(() => {

    }, [])


    return { getAlbums };
}

export default useGetAlbums;
