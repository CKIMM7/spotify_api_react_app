import React , { useEffect } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from "../../store/store";

import useSearchArts from "../../api/useSearchArts";
import useGetAlbums from "../../api/useGetAlbums";

import Modal from "../Modal";

const Artist = (data) => {
    const navigate = useNavigate()
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
    const toggle = useSelector((state) => state.cart.toggle);

    let artistComponents = searchArray.map((artist, i) => {

        return <div key={i} >
        <img src={`${artist.images[1].url}`}></img>
            <h2>{artist.name}</h2>
            <button onClick={
              () => {
                dispatch(artsActions.setToggle(true))
                dispatch(artsActions.setModal(true))
                getAlbums(artist.id)
                dispatch(artsActions.setToggle(false))
                navigate(`/artist?artistname=${textInput}&album=${artist.id}`)
 


            }}>{artist.id}</button>
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
    // console.log(param.get("artistname"))
    // console.log(document.referrer)
    dispatch(artsActions.setTextInput(param.get("artistname")))

}

  return () => {
    dispatch(artsActions.setTextInput(''))
  }

  }, [param.get("artistname")])
  

  useEffect(() => {
    console.log(params.album)
    if(params.album) {
      console.log('album query is there')

      getAlbums(params.album)


    }}, [])
//no dependency
//works only on first render
//it will not run again 


    return(
    <div>
        {!isError && content}
        {modalState && <Modal></Modal>}
        {isError && displayError}

    </div>
    )
}

export default Artist

