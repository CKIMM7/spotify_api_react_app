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

    const modal = useSelector((state) => state.cart.modal);
    const toggle = useSelector((state) => state.cart.toggle);

    let artistComponents = searchArray.map((artist, i) => {


        return <div key={i} className='artist'>

            {!artist.images.length == 0 ? <img src={`${artist.images[1].url}`}></img> : <img alt="No Image Available"></img>}


            <h2>{artist.name}</h2>
            <button onClick={
              () => {
                
                dispatch(artsActions.setModal(true))
                getAlbums(artist.id)
                dispatch(artsActions.setToggle(false))
                dispatch(artsActions.setToggle(true))
                navigate(`/artist?artistname=${textInput}&album=${artist.id}`)
 
                

            }}>View Alumbs</button>
        </div>
     })

    let content = searchArray.length === 0 && textInput && !isLoading ? <h1>This artist name does not exist</h1> :  <div className="artist-content">{artistComponents}</div>
 
    
    let displayError =  <>
    <h1>error message:</h1>
    <p>{error.message}</p>  
    <p>put in the right user name</p>
  </>


  useEffect(() => {

if(param.get("artistname")) {
    // console.log(param.get("artistname"))
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
      dispatch(artsActions.setModal(true))

    }}, [])
//no dependency
//works only on first render
//it will not run again 


    return(
    <div>
        {!isError && content}
        {modal && <Modal></Modal>}
        {isError && displayError}

    </div>
    )
}

export default Artist

