import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artsActions } from '../../store/store'

export default function Categories() {
  
  const categoryArray = useSelector(state => state.cart.categoryArray)


  let categoryComponent = categoryArray.map((cat, i) => {

    return <div key={i} className='category'>
        <img src={`${cat.icons[0].url}`}></img>
        <button onClick={() => {console.log('top categories')}}>{cat.name}</button>
    </div>
 })


  return (
    <div className='categories'>{categoryComponent}</div>
  )
}
