import "../styles/Lease.css"
import { useTranslation } from "react-i18next"
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/fire-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Success from "../components/Sucsess.js"


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

  const [phoneNumber, setPhoneNumber] = useState("")
  const [valid, setValid] = useState(true)

  const handleChange = (value) => {
    setPhoneNumber(value)
    setValid(validatePhoneNumber(value))
  }


  const validatePhoneNumber = () => {
    const phoneNumberPattern = /"\d{10}$/
    return phoneNumberPattern.test(phoneNumber)
  }

  const[isSuccess, setIsSuccess] = useState(false)

  const issuccessFunc = () => {
    setIsSuccess(true)
  }

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

            {/* <div class="input-container">
        <input type="number" class="input-field" min="100000000" max="999999999" placeholder="" id="number" required/>
        <label htmlFor="number" class="input-label">{t('phonenum')}</label>
    </div> */}

      <div className="container">
    <div className="phone-input-container">
    <label className="label">
      Enter your phone number
    <PhoneInput country={'us'} value={phoneNumber} onChange={handleChange} inputProps={{required: true,}} />
    </label>
    {!valid && (<p className="error-message">Invalide phone number</p>)}
    </div>
    </div>

            {isSuccess ? (<div className="successJs"><Success /></div>) : (<button onClick={issuccessFunc} type="submit">{t('savebtn')}</button>)}
        </form>
        </div>
    </div>
    </div>
  )
}

export default Lease
