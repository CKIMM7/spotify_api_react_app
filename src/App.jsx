import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import useSearchArts from "./api/useSearchArts";
import useGetToken from "./api/useGetToken";

import Header from "./Pages/layouts/Header"
import Repo from "./Pages/Welcome";

function App() {
  useGetToken()
  useSearchArts()

return (
  <Routes>
    <Route path='/' element={<Header></Header>}>

    {/* <Route path='/artist/:artistName' element={<Repo></Repo>} ></Route> */}

    <Route path='/artist' element={<Repo></Repo>} >
      
    </Route>

    </Route>

  </Routes>
) 
}

export default App
