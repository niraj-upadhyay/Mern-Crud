// import logo from './logo.svg';
import "./App.css";
import Detail from "./components/Detail";
import Edit from "./components/Edit";


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from "./components/Home";
import Navbaar from "./components/Navbaar";
import Register from "./components/Register";


import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbaar />
        <Routes>
         <Route path='/' element = {<Home/>}></Route>
         <Route path='/register' element = {<Register/>}></Route>
         <Route path='/edit/:id' element = {<Edit/>}></Route>
         <Route path='/view/:id' element = {<Detail/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
