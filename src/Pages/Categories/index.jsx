import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artsActions } from '../../store/store'
import axios from 'axios'

export default function Categories() {
  
  const categoryArray = useSelector(state => state.cart.categoryArray)
  const token = useSelector((state) => state.cart.token);

  const newReleaseArray = useSelector((state) => state.cart.newReleaseArray);
  const global50Array = useSelector((state) => state.cart.global50Array);


  let newReleaseComponent = newReleaseArray.map((d, i) => {
    return <div key={i} className='new-release'>
        <img src={d.images[1].url}></img>
        <p className='name'>Album Name: {d.name}</p>
        <p>Release Date: {d.release_date}</p>
        <p>Total Tracks: {d.total_tracks}</p>
    </div>
 })

 let global50Component = global50Array.map((d, i) => {
    return <div key={i} className='global-50'>
        <img src={`${d.track.album.images[1].url}`}></img>
        <p className='name'>Track Name: {d.track.name}</p>
        <p>Last Updated: {d.added_at}</p>
        <p>Artist Name: {d.track.artists[0].name}</p>
    </div>
 })

 
  return (
    <div className='home-page'>
      <div className='new-release-container'>
        <h1>New Releases</h1>
        <div className='new-releases'>{newReleaseComponent}</div>
      </div>

      <div className='global-50-container'>
        <h1>New Global 50</h1>
        <div className='global-50s'>{global50Component}</div>
      </div>
    </div>
  )
}
