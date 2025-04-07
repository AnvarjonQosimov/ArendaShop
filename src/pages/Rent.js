import "../styles/Rent.css";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Firebase from "../Firebase/Firebase.js"
import Loading from "../components/Loading.js"
import { TbRuler2Off } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { useState } from "react";

function Rent(props) {
   const [featuresId, setFeaturesId] = useState("")

   const userCards = props.cards
   console.log(props)

  const { t } = useTranslation();

  return (
    <div className="Rent">
      <div className="Rent_text">
        <h1>
          {t("rent")}
        </h1>
      </div>
      
      <div className="cardsAndLoading">
      {props.isLoading ? <div className="rentLoading"><Loading /></div> : (
        <div className="cards">
        {userCards.map((card) => (
        <div className="card" key={card.id}>
          <iframe autoPlay
        width="853"
        height="480"
        src="https://www.youtube.com/embed/FJBp4gKEkMg"
        title="Компактный одноэтажный модульный дом с террасой/Обзор модульных домов в современном стиле"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen>
        </iframe>
        {/* <div className="rentVideo">
          <video src={card.video}></video>
          <img src={card.video} alt="" />
        </div> */}
        <div className="lineee" />
        <h1>{card.initInf}</h1>
        <div className="rentcardline" />
        <div className="card-h2">
        <h2>{card.additInf}</h2>
        </div>
        <div className="rentcardline" />
        <h3>
        {t("price")}: {card.price}$
        <div className="priceline" />
        <span>{t("oyiga")}</span>
        </h3>
        <div className="rentcardline" />
        <h3>{t("phonenumber")}: {card.PhoneNumberInPanel}</h3>
        <div className="rentcardline" />
        <div className="rentcardicons">
        <div className="rentcardiconanimation">
          <i>
            <CiHeart onClick={() => setFeaturesId(card.id)}/>
          </i>
        </div>
        {/* <i><FaTrash /></i> */}
        </div>
        </div>
        ))}
      </div>
      )
      }
        </div>
      </div>
  );
}

export default  Rent;