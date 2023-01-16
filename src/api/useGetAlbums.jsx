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

    const getAlbums = (id) => {
      console.log('get albumbs')
  
      let url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=5`
    
      axios(url, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then (albums => {
          dispatch(artsActions.setAlbumArray(albums.data.items))
          
          //navigate(`${location.pathname}${location.search}&album=${id}`)
          navigate(`/artist?artistname=${textInput}&album=${id}`)
          console.log(location)

        })
        .catch(err => {
          console.log(err)
        })     
    }

    return { getAlbums };
}

export default useGetAlbums;
