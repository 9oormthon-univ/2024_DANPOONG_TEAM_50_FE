import React from "react";
import StarOnIcon from "../../assets/img/Main/star=on.svg";
import StarOffIcon from "../../assets/img/Main/star=off.svg";

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <img
      key={i}
      src={i < rating ? StarOnIcon : StarOffIcon}
      alt={i < rating ? "star-on" : "star-off"}
      className="star-icon"
    />
  ));
};

const ReviewCard = ({ storeName, nickname, profileImg, rating, description, userInfo, date }) => {
  return (
    <div className="review-card">
      <div className="header">
        <div className="profile-and-info">
          <img src={profileImg} alt={`${nickname} 프로필`} className="profile-img" />
          <div className="user-info">
            <h4 className="store-name">{storeName}</h4>
            <div className="nickname-and-details">
              <p className="nickname">{nickname}</p>
              <p className="user-details">{userInfo}</p>
            </div>
            <div className="rating-info">
              <div className="stars">{renderStars(Math.round(rating))}</div>
              <p className="date">{date}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="description">{description}</p>
    </div>
  );
};

export default ReviewCard;

