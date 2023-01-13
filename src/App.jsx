import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import useSearchArts from "./api/useSearchArts";
import useGetToken from "./api/useGetToken";

import Header from "./Pages/layouts/Header"
import Artist from "./Pages/Artist";

function App() {
  useGetToken()
  useSearchArts()

return (
  <Routes>
    <Route path='/' element={<Header></Header>}>
    <Route path='/artist' element={<Artist></Artist>}></Route>
    </Route>
  </Routes>
) 
}

export default App
