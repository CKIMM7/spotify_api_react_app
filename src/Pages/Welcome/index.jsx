import React , { useEffect } from "react";
import { useParams, useSearchParams ,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from "../../store/store";

const Repo = (data) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    let param = new URLSearchParams(location.search);
    let [searchParams, setSearchParams] = useSearchParams();

    const isLoading = useSelector((state) => state.cart.isLoading);
    const isError = useSelector((state) => state.cart.isError);
    const error = useSelector((state) => state.cart.error);
    
    const searchArray = useSelector(state => state.cart.searchArray)
    const textInput = useSelector((state) => state.cart.textInput);

    console.log(params)
    console.log(param.get("artistname"))
    console.log(location)

    let artistComponents = searchArray.map((repo, i) => {

        return <div key={i} >
            <h2>{repo.name}</h2>
        </div>
     })

    let content = searchArray.length === 0 && textInput && !isLoading ? <h1>no repos for this user</h1> :  artistComponents

    let displayError =  <>
    <h1>error message:</h1>
    <p>{error.message}</p>
    <p>put in the right user name</p>
  </>

  useEffect(() => {

if(param.get("artistname")) {
    console.log('con')
    dispatch(artsActions.setTextInput(param.get("artistname")))
    }

  }, [param.get("artistname")])

    return(
    <div>
        {/* <h1 id="repo-container">{data.data.name}</h1> */}
        {!isError && content}
        {isError && displayError}
    </div>
    )
}

export default Repo
