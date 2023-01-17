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
    console.log(d)
    return <div key={i} className='category'>
        <img src={d.images[1].url}></img>
        <p>{d.name}</p>
        <p>{d.release_date}</p>
        <p>{d.total_tracks}</p>
    </div>
 })

 let global50Component = global50Array.map((d, i) => {

    return <div key={i} className='global-50'>
    </div>
 })

 
  return (
    <>
      <div className='categories-container'>
        <h1>Categories container</h1>
        <div className='categories'>{newReleaseComponent}</div>
      </div>
    </>
  )
}
