import React,{useEffect, createContext, useReducer,useContext} from 'react';
import './App.css';
import NavBar from './components/Navbar';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import "./App.css"
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from "./reducers/userReducers"

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext)
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"));
   
    if(user) {
      dispatch({type:"USER", payload:user})
      navigate("/")
    }else{
      navigate("/signin")
    }
  
  },[])
return(
  <Routes>
  {/* <Route path = "/" element = {<NavBar/>}> </Route> */}
  <Route exact index element = {<Home/>}/>
  <Route exact path = "/signin" element = {<SignIn/>}/>
  <Route exact path = "/profile" element = {<Profile/>}/>
  <Route exact path = "/signup" element = {<SignUp/>}/>
  <Route exact path = "/create" element = {<CreatePost/>}/>
 
</Routes>
)
}

function App() {
 
  const [state, dispatch] = useReducer(reducer, initialState)
    return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>

         <BrowserRouter>
      <NavBar/>
       <Routing/>
      </BrowserRouter>
      </UserContext.Provider>
     
     
    </div>
  );
}

export default App;
