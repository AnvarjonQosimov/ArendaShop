import "../styles/Lease.css"
import { useTranslation } from "react-i18next"
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/fire-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';


function Lease() {
  // const [users, setUsers] = useState({});
  // const addDocsFire = async () => {
  //   try {
  //     const addData = await addDoc(collection(db, 'user'), {
  //       name: 'John',
  //       age: 23,
  //     });
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //   }
  // };


  // // Fetching data from Firestore
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const getDate = await getDocs(collection(db, 'user'));

  //       getDate.forEach((doc) => {
  //         setUsers(doc.data());
  //       });
  //     } catch (error) {
  //       console.error('Error getting document: ', error);
  //     }
  //   };

  //   fetchdata();
  // }, []);


  const { t } = useTranslation()
  return (
    <div className='Lease'>
      <div className="Lease">
        <div className="adminPanel">
          <div className="leasetext">
          <h1>{t('lease')}</h1>
          </div>


        <form action="">
            <div class="input-container">
        <input type="file" class="input-field" placeholder=" " id="video"/>
        <label htmlFor="video" class="input-label">{t('ivideo')}<span>{t('ivideopl')}</span></label>
    </div>

            <div className="lease-line"></div>

            <div class="input-container">
        <input type="text" class="input-field" placeholder=" " id="name" required/>
        <label htmlFor="name" class="input-label">{t('initalinf')}<span></span></label>
    </div>

            <div class="input-container">
        <input type="text" class="input-field" placeholder=" " id="optional" required/>
        <label htmlFor="optional" class="input-label">{t('additionalinf')}</label>
    </div>

            <div class="input-container">
        <input type="number" class="input-field" placeholder=" " id="price" required/>
        <label htmlFor="price" class="input-label">{t('price')}<span>{t('pricepl')}</span></label>
    </div>

            <div class="input-container">
        <input type="number" class="input-field" max="999999999" placeholder="" id="number" required/>
        <label htmlFor="number" class="input-label">{t('phonenum')}</label>
    </div>

            <button type="submit">{t('savebtn')}</button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Lease
