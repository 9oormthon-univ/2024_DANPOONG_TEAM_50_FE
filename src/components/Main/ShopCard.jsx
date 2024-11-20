import React from "react";
import StarOnIcon from "../../assets/img/Main/star=on.svg";

const ShopCard = ({ imgSrc, name, rating }) => {
  return (
    <div className="shop-card">
      <img src={imgSrc} alt={name} className="shop-image" />
      <div className="info-row">
        <h4 className="shop-name">{name}</h4>
        <div className="rating">
          <img src={StarOnIcon} alt="star" className="star-icon" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
