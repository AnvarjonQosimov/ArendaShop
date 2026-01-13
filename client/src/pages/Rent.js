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
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";

function Rent(props) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isClickedHeart, setIsClickedHeart] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const adminEmailMain = "anvarqosimov153@gmail.com";
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authUser = localStorage.getItem("userEmail");
    if (authUser) {
      setCurrentUser(authUser);
    }
  }, []);

  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    initInformation: "",
    additInformation: "",
    price: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});
  const [zoomImage, setZoomImage] = useState(null);
  const [fullCard, setFullCard] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/post/delete/${id}`);
      setUserCards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (card) => {
    setEditData({
      initInformation: card.initInformation,
      additInformation: card.additInformation,
      price: card.price,
      phoneNumber: card.phoneNumber,
    });
    setEditId(card._id);
    setIsEditOpen(true);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8090/api/post/edit/${editId}`,
        editData
      );

      setUserCards((prev) =>
        prev.map((card) =>
          card._id === editId ? { ...card, ...editData } : card
        )
      );

      setIsEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (isEditOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
          saveEdit();
        }

        if (e.key === "Escape") {
          setIsEditOpen(false);
        }
      }

      if (fullCard && e.key === "Escape") {
        setFullCard(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [isEditOpen, fullCard]);

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
                  {card.media && card.media.length > 0 && (
                    <div className="sliderContainer">
                      {card.media.length > 1 && (
                        <button
                          className="sliderBtn left"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide((prev) => ({
                              ...prev,
                              [card._id]:
                                prev[card._id] > 0
                                  ? prev[card._id] - 1
                                  : card.media.length - 1,
                            }));
                          }}
                        >
                          ‹
                        </button>
                      )}

                      <div
                        className="sliderInner"
                        style={{
                          width: `${card.media.length * 100}%`,
                          transform: `translateX(-${
                            (currentSlide[card._id] || 0) * 100
                          }%)`,
                        }}
                      >
                        {card.media.map((file, index) => {
                          const url = `http://localhost:8090/${file}`;

                          return file.endsWith(".mp4") ||
                            file.endsWith(".mov") ||
                            file.endsWith(".avi") ? (
                            <video
                              key={index}
                              src={url}
                              controls
                              className="slideItem"
                            />
                          ) : (
                            <img
                              key={index}
                              src={url}
                              className="slideItem"
                              onClick={() => setZoomImage(url)}
                            />
                          );
                        })}
                      </div>

                      {card.media.length > 1 && (
                        <button
                          className="sliderBtn right"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide((prev) => ({
                              ...prev,
                              [card._id]:
                                prev[card._id] < card.media.length - 1
                                  ? prev[card._id] + 1
                                  : 0,
                            }));
                          }}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="lineee"></div>

                <h1>{card.initInformation}</h1>

                <div className="rentcardline"></div>

                <div className="card-h2">
                  <h2 className="short-text" onClick={() => setFullCard(card)}>
                    {card.additInformation.length > 43
                      ? card.additInformation.slice(0, 43) + "..."
                      : card.additInformation}
                  </h2>
                </div>

                <div className="rentcardline"></div>

                <h3 className="price">
                  {t("price")}: {card.price} $<div className="priceline"></div>
                  <span>{t("oyiga")}</span>
                </h3>

                <div className="rentcardline"></div>

                <h3>
                  {t("phonenumber")}: +{card.phoneNumber}
                </h3>

                <div className="rentcardline"></div>

                <div className="rentcardicons">
                  <i onClick={() => toggleLike(card._id)} className="likeIcon">
                    <IoMdHeart
                      style={{
                        color: likedIds?.includes(card._id) ? "red" : "gray",
                        cursor: "pointer",
                      }}
                    />
                  </i>

                  {/* <button className="editBtn" onClick={() => handleEdit(card)}>
                    Edit
                  </button> */}

                  {currentUser === adminEmailMain && (
                    <button
                      className="deleteBtn"
                      onClick={() => setConfirmDeleteId(card._id)}
                    >
                      {t("delete")}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{t("edit")}</h2>

            <label>{t("title")}</label>
            <input
              value={editData.initInformation}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  initInformation: e.target.value,
                })
              }
            />

            <label>{t("description")}</label>
            <input
              value={editData.additInformation}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  additInformation: e.target.value,
                })
              }
            />

            <label>{t("price")}</label>
            <input
              value={editData.price}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  price: e.target.value,
                })
              }
            />

            <label>{t("phone")}</label>
            <input
              value={editData.phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 12) value = value.slice(0, 12);

                setEditData({
                  ...editData,
                  phoneNumber: value,
                });
              }}
            />

            <div className="modalButtons">
              <button
                className="saveBtn"
                onClick={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveEdit();
                  }
                }}
              >
                {t("save")}
              </button>
              <button
                className="cancelBtn"
                onClick={() => setIsEditOpen(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {zoomImage && (
        <div className="zoomOverlay" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} className="zoomFull" />
        </div>
      )}

      {fullCard && (
        <div className="fullModalOverlay" onClick={() => setFullCard(null)}>
          <div
            className="fullModalContent topView"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="topSlider fade-wrapper">
              {fullCard.media.length > 1 && (
                <button
                  className="arrow left"
                  onClick={() =>
                    setCurrentSlide((prev) => ({
                      ...prev,
                      full:
                        (prev.full || 0) > 0
                          ? prev.full - 1
                          : fullCard.media.length - 1,
                    }))
                  }
                >
                  ‹
                </button>
              )}

              <Zoom>
                <img
                  src={`http://localhost:8090/${
                    fullCard.media[currentSlide.full || 0]
                  }`}
                  className="topSliderImage fade-image"
                  key={currentSlide.full}
                  alt=""
                />
              </Zoom>

              {fullCard.media.length > 1 && (
                <button
                  className="arrow right"
                  onClick={() =>
                    setCurrentSlide((prev) => ({
                      ...prev,
                      full:
                        (prev.full || 0) < fullCard.media.length - 1
                          ? prev.full + 1
                          : 0,
                    }))
                  }
                >
                  ›
                </button>
              )}
            </div>

            {fullCard.media.length > 1 && (
              <div className="thumbnailRow">
                {fullCard.media.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8090/${img}`}
                    className={`thumb ${
                      index === (currentSlide.full || 0) ? "thumbActive" : ""
                    }`}
                    onClick={() =>
                      setCurrentSlide((prev) => ({
                        ...prev,
                        full: index,
                      }))
                    }
                  />
                ))}
              </div>
            )}

            <div className="topModalInfo">
              <h1>{fullCard.initInformation}</h1>

              <p className="topDescription">{fullCard.additInformation}</p>

              <p>
                <strong>{t("price")}:</strong> {fullCard.price} $
              </p>
              <p>
                <strong>{t("phone")}:</strong> +{fullCard.phoneNumber}
              </p>

              <button
                className="closeFullBtn"
                onClick={() => setFullCard(null)}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div
          className="confirmOverlay"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div className="confirmBox" onClick={(e) => e.stopPropagation()}>
            <h2>{t("deleteconfirm")}?</h2>
            <p>{t("deleteP")}</p>

            <div className="confirmButtons">
              <button
                className="confirmYes"
                onClick={() => {
                  handleDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                {t("yes")}
              </button>

              <button
                className="confirmNo"
                onClick={() => setConfirmDeleteId(null)}
              >
                {t("no")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rent;