import React, { useState } from "react";
import LocationIcon from "../../assets/img/Search/locate.svg";
import StarIcon from "../../assets/img/Search/star=on.svg";
import HeartIcon from "../../assets/img/Search/like=off.svg";
import HeartFilledIcon from "../../assets/img/Search/like=on.svg";

const SearchCard = ({
  imgSrc,
  title,
  rating,
  location,
  distance,
  priceRange,
  reviewCount,
  id,
  totalDonation = 0,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const updatedFavorites = { ...storedFavorites, [id]: !isFavorite };
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="list-card">
      <img src={imgSrc} alt={title} className="card-image" />
      <div className="card-details">
        <div className="title-row">
          <div className="title-and-rating">
            <h4 className="title">{title}</h4>
            <div className="rating-row">
              <img src={StarIcon} alt="rating" className="star-icon" />
              <span className="rating">{rating}</span>
            </div>
          </div>
          <img
            src={isFavorite ? HeartFilledIcon : HeartIcon}
            alt="favorite"
            className="favorite-icon"
            onClick={handleToggleFavorite}
          />
        </div>
        <div className="location-row">
          <img src={LocationIcon} alt="location" className="location-icon" />
          <span>{location}</span>
        </div>
        <div className="distance-row">
          <span>현 위치에서 {distance}m</span>
        </div>
        <div className="price-row">
          <span>{priceRange}원</span>
        </div>
        <div className="review-row">
          <span>리뷰 {reviewCount}개</span>
        </div>
        <div className="donation-row">
          <span className="label">총 후원금 </span>
          <span className="amount">{totalDonation.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;