import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LocationIcon from "../../assets/img/Search/locate.svg";
import StarIcon from "../../assets/img/Search/star=on.svg";
import HeartIcon from "../../assets/img/Search/like=off.svg";
import HeartFilledIcon from "../../assets/img/Search/like=on.svg";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const SearchCard = ({
  imgSrc,
  title,
  rating,
  location,
  reviewCount,
  likeCount,
  totalDonation,
  id,
  distance,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("mymoo"));
        const accessToken = storedData?.["user-token"];

        if (!accessToken) {
          console.error("Access token not found. Please log in.");
          return;
        }

        const response = await axios.get(
          `https://api.mymoo.site/api/v1/stores/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { likeable } = response.data;
        setIsFavorite(!likeable);
      } catch (error) {
        console.error(
          `Failed to fetch store details for storeId: ${id}`,
          error
        );
      }
    };

    fetchStoreDetails();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem("mymoo"));
      const accessToken = storedData?.["user-token"];

      if (!accessToken) {
        console.error("Access token not found. Please log in.");
        return;
      }

      const updatedFavoriteStatus = !isFavorite;

      await axios.patch(
        `https://api.mymoo.site/api/v1/stores/${id}/likes`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      const updatedFavorites = {
        ...storedFavorites,
        [id]: updatedFavoriteStatus,
      };
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(updatedFavoriteStatus);
    } catch (error) {
      console.error(
        `Failed to update favorite status for storeId: ${id}`,
        error
      );
    }
  };

  const handleCardClick = () => {
    navigate(`/order?key=${id}`);
  };

  console.log("distance:", distance);
  console.log("totalDonation:", totalDonation);

  return (
    <div className="list-card" onClick={handleCardClick}>
      <img src={imgSrc} alt={title} className="card-image" />
      <div className="card-details">
        <div className="title-row">
          <div className="title-and-rating">
            <h4 className="title">{title}</h4>
          </div>
          <img
            src={isFavorite ? HeartFilledIcon : HeartIcon}
            alt="favorite"
            className="favorite-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
          />
        </div>
        <div className="rating-row">
          <img src={StarIcon} alt="rating" className="star-icon" />
          <span className="rating">
            {rating !== undefined && rating !== null
              ? rating.toFixed(1)
              : "4.5"}
          </span>
        </div>
        <div className="location-row">
          <img src={LocationIcon} alt="location" className="location-icon" />
          <span className="location-text">{truncateText(location, 20)}</span>
        </div>
        {distance && (
          <div className="distance-row">
            <span>현재 위치에서 {(distance / 1000).toFixed(1)} km</span>
          </div>
        )}
        <div className="review-row">
          <span>리뷰 {reviewCount}개</span>
        </div>
        <div className="like-row">
          <span>좋아요 {likeCount}개</span>
        </div>
        <div className="donation-row">
          <span className="label">총 후원금 </span>
          <span className="amount">
            {totalDonation ? totalDonation.toLocaleString() : "0"}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
