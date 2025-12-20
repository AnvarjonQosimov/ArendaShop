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
import { auth } from "../Firebase/Firebase.js";

function Lease() {
  const [age, setAge] = React.useState("");

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState([]);
  const [initalInformation, setInitalInformation] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumberInPanel, setPhoneNumberInPanel] = useState("");
  const [collectionAdmin, setCollectionAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mediaInputRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const addData = async (e) => {
    e.preventDefault();

    const wordCount = additionalInformation.trim().split(/\s+/).length;
    if (wordCount < 30) {
      alert("Description must contain at least 30 words.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();

      const cleanPhone = phoneNumberInPanel.replace(/\D/g, "");

      const ownerId = auth.currentUser?.uid;
      formData.append("ownerId", ownerId);
      formData.append("initInformation", initalInformation);
      formData.append("additInformation", additionalInformation);
      formData.append("price", price);
      formData.append("phoneNumber", cleanPhone);
      formData.append("id", uuid());

      for (let file of files) {
        formData.append("media", file);
      }

      await axios.post("http://localhost:8090/api/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Ma'lumot muvaffaqiyatli qo'shildi!");
      // <Success className="successJs"/>

      setFiles([]);
      if (mediaInputRef.current) {
        mediaInputRef.current.value = "";
      }

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
                    ref={mediaInputRef}
                    id="media"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => setFiles([...files, ...e.target.files])}
                    style={{ display: "none" }}
                  />

                  <div className="preview-container">
                    {files.map((file, index) => (
                      <div key={index} className="preview-item">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="preview-image"
                          />
                        ) : (
                          <video
                            className="preview-video"
                            src={URL.createObjectURL(file)}
                            controls
                          />
                        )}

                        <button
                          className="remove-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setFiles(files.filter((_, i) => i !== index));
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <label htmlFor="media" className="media-upload-label">
                    {files.length > 0
                      ? `Selected: ${files.length} files`
                      : t("ivideo")}
                  </label>
                </div>

                {/* <label htmlFor="media" className="media-upload-label">
                    {picture?.name || video?.name || t("ivideo")}
                  </label>

                  {!(picture?.name || video?.name) && (
                    <label className="floating-label">{t("ivideo")}</label>
                  )} */}

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