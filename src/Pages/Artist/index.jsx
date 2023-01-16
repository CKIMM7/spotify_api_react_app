import React , { useEffect } from "react";
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from "../../store/store";

import useSearchArts from "../../api/useSearchArts";
import useGetAlbums from "../../api/useGetAlbums";

const Artist = (data) => {
    //const { getArists } = useSearchArts('nothing');
    const { getAlbums } = useGetAlbums()
    const dispatch = useDispatch();
    const location = useLocation();
    let param = new URLSearchParams(location.search);

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const isLoading = useSelector((state) => state.cart.isLoading);
    const isError = useSelector((state) => state.cart.isError);
    const error = useSelector((state) => state.cart.error);
    
    const searchArray = useSelector(state => state.cart.searchArray)
    const albumArray = useSelector(state => state.cart.albumArray)
    const textInput = useSelector((state) => state.cart.textInput);

    const modalState = useSelector((state) => state.cart.modal);


    let artistComponents = searchArray.map((artist, i) => {

        return <div key={i} >
        <img src={`${artist.images[1].url}`}></img>
            <h2>{artist.name}</h2>
            <button onClick={() => {getAlbums(artist.id)}}>{artist.id}</button>
        </div>
     })

    let content = searchArray.length === 0 && textInput && !isLoading ? <h1>no repos for this user</h1> :  artistComponents

    let displayError =  <>
    <h1>error message:</h1>
    <p>{error.message}</p>  
    <p>put in the right user name</p>
  </>


  useEffect(() => {

if(param.get("artistname")) {
    console.log('con')
    dispatch(artsActions.setTextInput(param.get("artistname")))

}

  return () => {
    dispatch(artsActions.setTextInput(''))
  }

  }, [param.get("artistname")])

  //happens when artistname changes

  useEffect(() => {
    console.log(params.album)
    if(params.album) {
      console.log('album query is there')
      dispatch(artsActions.setModal(true))
    }
    
  }, [])


    return(
    <div>
        {!isError && content}
        {modalState && <h1>Modal</h1>}
        {isError && displayError}

    </div>
    )
}

export default Artist

