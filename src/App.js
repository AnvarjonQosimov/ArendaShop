import './App.css';
import Header from "./components/Header.js"
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import  Rent from "./pages/Rent.js"
import  Lease from "./pages/Lease.js"
import  Contact from "./pages/Contact.js"
import {  Route, Routes } from 'react-router-dom'
import Features from "./pages/Features.js"
import { db } from './Firebase/Firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function App() {
   const [cards, setCards] = useState([]);
      const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
     try{
   await   getDocs(collection(db, 'cards'))
      .then((querySnapshot) => {
        
        // console.log(querySnapshot);
        const cardsData =  querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cardsData);
        setIsLoading(false)
        })
     }
        catch(error) {
          console.error('Error getting documents: ', error);
        };
    };
  
    useEffect(() => {
      getData();
    }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"}  element={<Home />}/>
        <Route path={"/about"} element={<About />}/>
        <Route path={"/lease"} element={<Lease />}/>
        <Route path={"/rent"} element={<Rent cards={cards} isLoading={isLoading} />}/>
        <Route path={"/contact"} element={<Contact />}/>
        <Route path={"/features"} element={<Features cards={cards} />}/>
      </Routes>
    </div>
  );
}

export default App;
