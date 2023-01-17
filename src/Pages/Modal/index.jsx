import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artsActions } from '../../store/store'

export default function Modal() {
  
  const dispatch = useDispatch()

  const closeModalHandler = () => {
    dispatch(artsActions.setModal(false))
    //dispatch(artsActions.setAlbumArray([]))
    console.log('close')
  }

  return (
    <div id="modal" className="modal">
    <div className="modal-content">
      <span onClick={()=> closeModalHandler()} className="close">&times;</span>
      <p>Please wait for the server to process the request</p>
    </div>
  </div>
  )
}
