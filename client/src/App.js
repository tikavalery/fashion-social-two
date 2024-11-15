
import './App.css';
import NavBar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
// import SignUp from './components/screens/SignUp';
// import SignUp from './components/screens/SignUp';
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        {/* <Route path = "/" element = {<NavBar/>}> </Route> */}
        <Route exact index element = {<Home/>}/>
        <Route exact path = "/signin" element = {<SignIn/>}/>
        <Route exact path = "/profile" element = {<Profile/>}/>
        <Route exact path = "/signup" element = {<SignUp/>}/>
        <Route exact path = "/create" element = {<CreatePost/>}/>
       
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
