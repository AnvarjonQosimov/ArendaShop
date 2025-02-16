import './App.css';
import Header from "./components/Header.js"
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import  Rent from "./pages/Rent.js"
import  Lease from "./pages/Lease.js"
import  Contact from "./pages/Contact.js"
import {  Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"}  element={<Home />}/>
        <Route path={"/about"} element={<About />}/>
        <Route path={"/lease"} element={<Lease />}/>
        <Route path={"/rent"} element={<Rent />}/>
        <Route path={"/contact"} element={<Contact />}/>
      </Routes>
    </div>
  );
}

export default App;
