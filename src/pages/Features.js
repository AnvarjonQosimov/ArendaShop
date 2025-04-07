import "../styles/Features.css"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
function Features(props) {
  const [isCardId, setIsCardId] = useState(false)
   
    const { t } = useTranslation();

    console.log(props)
    const userId = props.cards.id
    const userCard = props.cards
    const featureCardId = () => {
      setIsCardId(true)
    }
  return (
    <div className='Features'>
      <div className="features-text">
        <h1>{t("saralanganlar")}</h1>
      </div>

      <div className="features">
        {featureCardId == userId ? (
          <div className="cards">
            {userCard.map((card) => (
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
                      <CiHeart />
                    </i>
                  </div>
                  {/* <i><FaTrash /></i> */}
                  </div>
                  </div>
                  ))}
          </div>
        )
        :
      (
        ""
      )
      }
      </div>
    </div>
  )
}

export default Features
