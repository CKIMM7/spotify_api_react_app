import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import useSearchArts from "./api/useSearchArts";
import useGetToken from "./api/useGetToken";
import useGetAlbums from "./api/useGetAlbums";

import Header from "./Pages/layouts/Header"
import Artist from "./Pages/Artist";

import { useSearchParams } from 'react-router-dom';


function App() {
  const [searchParams] = useSearchParams();
  useGetToken()
  useSearchArts();

  
  console.log(searchParams.get("artistname"))

return (
  <Routes>
    <Route path='/' element={<Header></Header>}>
    <Route path='/artist' element={<Artist></Artist>}></Route>
    </Route>
  </Routes>
) 
}

export default App
