import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { artsActions } from '../../store/store'
import axios from 'axios'

export default function Categories() {
  
  const categoryArray = useSelector(state => state.cart.categoryArray)
  const token = useSelector((state) => state.cart.token);

  const getCategory = (url) => {
    
    axios(url, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then (cat => {
        console.log(cat)
        console.log('categories api call inside')
    })
    .catch(err => {
        console.log(err)
    })}

  let categoryComponent = categoryArray.map((cat, i) => {

    return <div key={i} className='category'>
        <img src={`${cat.icons[0].url}`}></img>
        <button onClick={() => {getCategory(cat.href)}}>{cat.name}</button>
    </div>
 })

 
  return (
    <div className='categories'>{categoryComponent}</div>
  )
}
