import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  reviewCount,
  id,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [allDonation, setAllDonation] = useState(0);
  const [priceRange, setPriceRange] = useState("메뉴 정보 없음");

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
        const { allDonation, likeable } = response.data;

        setAllDonation(allDonation);
        setIsFavorite(!likeable);
      } catch (error) {
        console.error(`Failed to fetch store details for storeId: ${id}`, error);
      }
    };

    const fetchStoreMenus = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("mymoo"));
        const accessToken = storedData?.["user-token"];

        if (!accessToken) {
          console.error("Access token not found. Please log in.");
          return;
        }

        const response = await axios.get(
          `https://api.mymoo.site/api/v1/stores/${id}/menus`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const menus = response.data.menus;

        if (menus && menus.length > 0) {
          const prices = menus.map((menu) => menu.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange(`${minPrice.toLocaleString()} ~ ${maxPrice.toLocaleString()}`);
        } else {
          setPriceRange("메뉴 정보 없음");
        }
      } catch (error) {
        console.error(`Failed to fetch menus for storeId: ${id}`, error);
        setPriceRange("메뉴 정보 없음");
      }
    };

    fetchStoreDetails();
    fetchStoreMenus();
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

      await axios.patch(`https://api.mymoo.site/api/v1/stores/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
      const updatedFavorites = { ...storedFavorites, [id]: updatedFavoriteStatus };
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(updatedFavoriteStatus);
    } catch (error) {
      console.error(`Failed to update favorite status for storeId: ${id}`, error);
    }
  };

  const handleCardClick = () => {
    navigate(`/api/v1/stores/${id}`); 
  };

  return (
    <div className="list-card" onClick={handleCardClick}> 
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
            onClick={(e) => {
              e.stopPropagation(); 
              handleToggleFavorite();
            }}
          />
        </div>
        <div className="location-row">
          <img src={LocationIcon} alt="location" className="location-icon" />
          <span className="location-text">{location}</span>
        </div>
        <div className="distance-row">
          <span>현 위치에서 {distance}m</span>
        </div>
        <div className="price-row">
          <span>{priceRange}</span>
        </div>
        <div className="review-row">
          <span>리뷰 {reviewCount}개</span>
        </div>
        <div className="donation-row">
          <span className="label">총 후원금 </span>
          <span className="amount">{allDonation.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
