import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Signup />} />
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element ={<Home/>} />

      </Routes>
      </BrowserRouter>
        
    )
}
export default App;