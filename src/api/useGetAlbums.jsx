import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { artsActions } from "../store/store";
import axios from "axios"

  const useGetAlbums = () => { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);

    const getAlbums = (id) => {
      console.log('get albumbs')
  
      let url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=5`
    
      axios(url, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then (albums => {
          console.log('albums.jsx')
          console.log(albums);
          dispatch(artsActions.setAlbumArray(albums.data.items))
          
          navigate(`${location.pathname}${location.search}&album=${id}`)
        })
        .catch(err => {
          console.log(err)
        })     
    }

    return { getAlbums };
}

export default useGetAlbums;
