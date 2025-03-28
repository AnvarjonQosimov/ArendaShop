import * as React from "react"
import "../styles/Lease.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Success from "../components/Sucsess.js";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "../components/Loading.js"

function Lease() {
    const [age, setAge] = React.useState('');
  
    const handleChangeSelect = (event) => {
      setAge(event.target.value);
    }

    const [video, setVideo] = useState("");
    const [initalInformation, setInitalInformation] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [price, setPrice] = useState("");
    const [phoneNumberInPanel, setPhoneNumberInPanel] = useState("");
    const [collectionAdmin, setCollectionAdmin] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
    };

    const addData = async () => {
      try {
        setIsLoading(true)
        await addDoc(collection(db, collectionAdmin), {
          video: video,
          initInf: initalInformation,
          additInf: additionalInformation,
          price: price,
          PhoneNumberInPanel: phoneNumberInPanel
        });
        alert("Ma'lumot muvaffaqiyatli qo'shildi!");
        // <Success className="successJs"/>
        setVideo("");
        setInitalInformation("");
        setAdditionalInformation("");
        setPrice("");
        setPhoneNumberInPanel("");
        setIsLoading(false)
      } catch (error) {
        console.error("Xatolik:", error);
      }
    }

  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = value => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = () => {
    const phoneNumberPattern = /"\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const [isSuccess, setIsSuccess] = useState(false);

  // const issuccessFunc = () => {
  //   setIsSuccess(true);
  // };

  return (
    <div className="Lease">
      <div className="Lease">
        <div className="adminPanel">
          <div className="leasetext">
            <h1>
              {t("lease")}
            </h1>
          </div>

        {isLoading ? (<div className="leaseLoading"><Loading /></div>) : (
            <div>
              <form onSubmit={handleSubmit}>
            <div class="input-container">
              <input
                type="file"
                value={video}
                class="input-field"
                placeholder=" "
                onChange={(e) => setVideo(e.target.value)}
                id="video"
                required
              />
              <label htmlFor="video" class="input-label">
                {t("ivideo")}
                <span>
                  {t("ivideopl")}
                </span>
              </label>
            </div>

            <div className="lease-line" />

            <div className="input-container">
              <input
                type="text"
                value={initalInformation}
                className="input-field"
                placeholder=" "
                onChange={(e) => setInitalInformation(e.target.value)}
                id="name"
                required
              />
              <label htmlFor="name" className="input-label">
                {t("initalinf")}
                <span />
              </label>
            </div>

            <div className="input-container">
              <input
                type="text"
                value={additionalInformation}
                className="input-field"
                placeholder=" "
                onChange={(e) => setAdditionalInformation(e.target.value)}
                id="optional"
                required
              />
              <label htmlFor="optional" className="input-label">
                {t("additionalinf")}
              </label>
            </div>

            <div className="input-container">
              <input
                type="number"
                value={price}
                className="input-field"
                placeholder=" "
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                required
              />
              <label htmlFor="price" className="input-label">
                {t("price")}
                <span>
                  {t("pricepl")}
                </span>
              </label>
            </div>

            <div className="container">
              <div className="phone-input-container">
                <label className="label">
                  Enter your phone number
                  <PhoneInput
                    country={"us"}
                    value={phoneNumberInPanel}
                    // onChange={(e)=>{
                    //   setPrice(e.target.value)
                    //   handleChange
                    // }} 
                    onChange={handleChange}
                    // inputProps={{ required: true }}
                    required
                  />
                </label>
              </div>
            </div>
            <button type="submit" onClick={addData}>{t("savebtn")}</button>
            <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Bo'limni tanlang
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => setCollectionAdmin('users')}
            href='#/action-1'
          >
            users
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setCollectionAdmin('about')}
            href='#/action-2'
          >
            About
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setCollectionAdmin('cards')}
            href='#/action-3'
          >
            Cards
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
          </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lease;