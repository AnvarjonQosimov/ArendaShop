import "../styles/Rent.css";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Firebase from "../Firebase/Firebase.js"
import { db } from "../Firebase/Firebase.js";
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Rent() {
  const [cards, setCards] = useState([]);

  const getData = () => {
    getDocs(collection(db, 'cards'))
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        const cardsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cardsData);
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const { t } = useTranslation();
  return (
    <div className="Rent">
      <div className="Rent_text">
        <h1>
          {t("rent")}
        </h1>
      </div>
      
      <div className="cards">
          {cards.map((card) => (
            <div className="card" key={card}>
              <iframe autoplay
            width="853"
            height="480"
            src="https://www.youtube.com/embed/FJBp4gKEkMg"
            title="Компактный одноэтажный модульный дом с террасой/Обзор модульных домов в современном стиле"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
            </iframe>
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
                <CiHeart />
              </i>
            </div>
            {/* <i><FaTrash /></i> */}
          </div>
          </div>
          ))}
        </div>
      </div>
  );
}

export default Rent;