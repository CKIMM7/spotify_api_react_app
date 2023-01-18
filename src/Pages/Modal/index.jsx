import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artsActions } from '../../store/store'

export default function Modal() {
  
  const albumArray = useSelector(state => state.cart.albumArray)
  const dispatch = useDispatch()  


  const closeModalHandler = () => {
    dispatch(artsActions.setModal(false))
    console.log('close')
  }

  useEffect(() => {

    return () => {
      console.log('modal closed')
      dispatch(artsActions.setAlbumArray([]))
    }
    
  }, [])
  

  let artistComponents = albumArray.map((artist, i) => {

   return <div key={i} className="modal-album">
      <img src={`${artist.images[1].url}`}></img>
      <p>Artist Name: {artist.name}</p>
      <p>Release Date: {artist.release_date}</p>
      <p>Total Tracks: {artist.total_tracks}</p>
    </div>
 })


  return (
    <div id="modal" className="modal">
    <div className="modal-content">
      <button onClick={()=> closeModalHandler()} className="close">Close Albums</button>
      {artistComponents}
    </div>
  </div>
  )
}
