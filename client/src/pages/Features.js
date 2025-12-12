// src/pages/Features.js
import React, { useContext, useEffect, useState } from "react";
import "../styles/Features.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { LikeContext } from "../components/likedContext";
import { IoMdHeart } from "react-icons/io";
import { FaHeartBroken } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Features() {
  const { likedIds, toggleLike } = useContext(LikeContext);
  const { t } = useTranslation();

  const [cards, setCards] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [zoomImage, setZoomImage] = useState(null);
  const [fullCard, setFullCard] = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios
      .get("http://localhost:8090/api/post/get")
      .then((res) => {
        if (!cancelled) setCards(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load cards:", err);
        if (!cancelled) setCards([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const likedCards = cards.filter((c) => likedIds.includes(c._id));

  return (
    <div className="Features">
      <div className="features-text">
        <h1>{t("saralanganlar")}</h1>
      </div>

      <div className="features">
        <div className="cards">
          {likedCards.map((card) => (
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
                              (prev[card._id] || 0) > 0
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
                              (prev[card._id] || 0) < card.media.length - 1
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

              <div className="lineee" />

              <h1>{card.initInformation}</h1>

              <div className="rentcardline" />

              <h2 className="short-text" onClick={() => setFullCard(card)}>
                {card.additInformation.length > 43
                  ? card.additInformation.slice(0, 43) + "..."
                  : card.additInformation}
              </h2>

              <div className="rentcardline" />

              <h3 className="price">
                {t("price")}: {card.price} $<div className="priceline" />
                <span>{t("oyiga")}</span>
              </h3>

              <div className="rentcardline" />

              <h3>
                {t("phonenumber")}: +{card.phoneNumber}
              </h3>

              <div className="rentcardline" />

              <div className="rentcardicons">
                <i
                  className="heartBrokenIcon"
                  onClick={() => toggleLike(card._id)}
                >
                  <FaHeartBroken
                    className={`hbIcon ${
                      likedIds?.includes(card._id) ? "activeHB" : ""
                    }`}
                  />
                </i>
              </div>
            </div>
          ))}
        </div>

        {likedCards.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            {t("saralangan_yoq")}
          </p>
        )}
      </div>

      {zoomImage && (
        <div className="zoomOverlay" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} className="zoomFull" alt="" />
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
                <strong>Price:</strong> {fullCard.price} $
              </p>
              <p>
                <strong>Phone:</strong> +{fullCard.phoneNumber}
              </p>

              <button
                className="closeFullBtn"
                onClick={() => setFullCard(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Features;
