import * as React from "react";
import "../styles/Lease.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Success from "../components/Sucsess.js";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../components/Loading.js";
import { v4 as uuid } from "uuid";
import InputMask from "react-input-mask";
import axios from "axios";

function Lease() {
  const [age, setAge] = React.useState("");

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [initalInformation, setInitalInformation] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumberInPanel, setPhoneNumberInPanel] = useState("");
  const [collectionAdmin, setCollectionAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const addData = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();

      const cleanPhone = phoneNumberInPanel.replace(/\D/g, "");

      formData.append("picture", picture);
      formData.append("video", video);
      formData.append("initInformation", initalInformation);
      formData.append("additInformation", additionalInformation);
      formData.append("price", price);
      formData.append("phoneNumber", cleanPhone);
      formData.append("id", uuid());
      await axios.post("http://localhost:8090/api/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Ma'lumot muvaffaqiyatli qo'shildi!");
      // <Success className="successJs"/>
      setVideo(null);
      setInitalInformation("");
      setAdditionalInformation("");
      setPrice("");
      setPhoneNumberInPanel("");
      setIsLoading(false);
    } catch (error) {
      console.error("Xatolik:", error);
      setIsLoading(false);
    }
  };

  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(number);
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
            <h1>{t("lease")}</h1>
          </div>

          {isLoading ? (
            <div className="leaseLoading">
              <Loading />
            </div>
          ) : (
            <div>
              <form onSubmit={(e) => addData(e)}>
                <div className="media-upload-container">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    placeholder=" "
                    id="media"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      if (file.type.startsWith("image/")) {
                        setPicture(file);
                        setVideo(null);
                      } else if (file.type.startsWith("video/")) {
                        setVideo(file);
                        setPicture(null);
                      }
                    }}
                    required
                  />

                  {/* <label htmlFor="media" className="media-upload-label">
                    {picture?.name || video?.name || t("ivideo")}
                  </label>

                  {!(picture?.name || video?.name) && (
                    <label className="floating-label">{t("ivideo")}</label>
                  )} */}

                  <label htmlFor="media" className="media-upload-label">
                    {picture?.name || video?.name || t("ivideo")}
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
                    <span>{t("pricepl")}</span>
                  </label>
                </div>

                <div className="container">
                  <label htmlFor="phone" className="input-label">
                    Phone number
                  </label>
                  <PhoneInput
                    country={"uz"}
                    value={phoneNumberInPanel}
                    onChange={(phone) => setPhoneNumberInPanel(phone)}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "8px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>

                <button type="submit">{t("savebtn")}</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lease;
