import { useEffect } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";

  const useGetAlbums = () => { 
  
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
          console.log(albums.data.items);
        })
        .catch(err => {
          console.log(err)
        })     
    }

    return { getAlbums };
}

export default useGetAlbums;
