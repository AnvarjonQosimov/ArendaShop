import "../styles/Rent.css";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Firebase from "../Firebase/Firebase.js";
import Loading from "../components/Loading.js";
import { TbRuler, TbRuler2Off } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { useContext, useState, useEffect } from "react";
import { LikeContext } from "../components/likedContext.js";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";

function Rent(props) {
  // const [featuresId, setFeaturesId] = useState('');
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isClickedHeart, setIsClickedHeart] = useState(true);
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { likedIds, toggleLike } = useContext(LikeContext);

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/post/get");
      setUserCards(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const { t } = useTranslation();

  const heartClicked = () => {
    setIsClickedHeart((prev) => !prev);
    setIsHeartClicked((prev) => !prev);
  };

  return (
    <div className="Rent">
      <div className="Rent_text">
        <h1>{t("rent")}</h1>
      </div>

      <div className="cardsAndLoading">
        {props.isLoading ? (
          <div className="rentLoading">
            <Loading />
          </div>
        ) : (
          <div className="cards">
            {userCards.map((card) => (
              <div className="card" key={card._id}>
                <div className="rentVideo">
                  {card.video ? (
                    <video
                      src={`http://localhost:8090/${card.video}`}
                      controls
                      style={{ width: "100%", height: "100%" }}
                    ></video>
                  ) : null}

                  {card.picture ? (
                    <img
                      src={`http://localhost:8090/${card.picture}`}
                      alt="rent"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : null}
                </div>
                <div className="lineee"></div>
                <h1>{card.initInformation}</h1>
                <div className="rentcardline"></div>
                <div className="card-h2">
                  <h2>{card.additInformation}</h2>
                </div>
                <div className="rentcardline"></div>
                <h3>
                  {t("price")}: {card.price} $<div className="priceline"></div>
                  <span>{t("oyiga")}</span>
                </h3>
                <div className="rentcardline"></div>
                <h3>
                  {t("phonenumber")}: +{card.phoneNumber}
                </h3>
                <div className="rentcardline"></div>
                <div className="rentcardicons">
                  <div className="rentcardiconanimation">
                    <i onClick={() => toggleLike(card.id)}>
                      <IoMdHeart
                        style={{
                          color: likedIds.includes(card.id) ? "red" : "gray",
                          cursor: "pointer",
                        }}
                      />
                    </i>
                  </div>
                  {/* <i><FaTrash /></i> */}
                </div>
                {/* <button className="deleteCards" onClick={() => toggleLike(card.id)}>
                  Delete
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rent;
{
  /* <IoMdHeart /> */
}

{
  /* <i>
<CiHeart onClick={() => toggleLike(card.id)} />
</i> */
}
