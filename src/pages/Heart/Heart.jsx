import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchCard from "../../components/Search/SearchCard";

const HeartPage = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [noFavorites, setNoFavorites] = useState(false);
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  // 20자를 초과하는 경우 생략 처리 함수
  const shortenText = (text, maxLength = 20) => {
    if (!text || typeof text !== "string") return ""; // null, undefined, 비문자열 처리
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  useEffect(() => {
    // 사용자 위치 가져오기
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            setUserLocation({ latitude: null, longitude: null });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation({ latitude: null, longitude: null });
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("mymoo"));
        const accessToken = storedData?.["user-token"];

        if (!accessToken) {
          console.error("Access token not found. Please log in.");
          setNoFavorites(true);
          return;
        }

        // localStorage에서 좋아요 데이터 가져오기
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};

        // 객체의 키를 배열로 변환
        const favoriteIds = Object.keys(storedFavorites).filter(
          (key) => storedFavorites[key] === true
        );

        if (favoriteIds.length === 0) {
          setNoFavorites(true);
          return;
        }

        // 좋아요한 가게 정보를 API로 각각 요청
        const restaurantDetails = await Promise.all(
          favoriteIds.map(async (storeId) => {
            const response = await axios.get(
              `https://api.mymoo.site/api/v1/stores/${storeId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                params: {
                  latitude: userLocation.latitude, // 위도 추가
                  longitude: userLocation.longitude, // 경도 추가
                },
              }
            );
            return { ...response.data, storeId };
          })
        );

        setFavoriteRestaurants(restaurantDetails);
        setNoFavorites(restaurantDetails.length === 0);
      } catch (error) {
        console.error("Failed to fetch favorite restaurants:", error);
        setNoFavorites(true);
      }
    };

    // 사용자 위치가 있을 때만 API 호출
    if (userLocation.latitude && userLocation.longitude) {
      fetchFavoriteRestaurants();
    }
  }, [userLocation]); // userLocation이 변경될 때 API 호출

  return (
    <div className="heart-page">
      <h2 className="page-title">좋아요한 목록</h2>
      <div className="restaurant-list-container">
        {favoriteRestaurants.length > 0 && !noFavorites ? (
          <div className="restaurant-list">
            {favoriteRestaurants.map((restaurant) => (
              <SearchCard
                key={restaurant.storeId}
                imgSrc={restaurant.imagePath}
                title={restaurant.name}
                rating={restaurant.stars}
                location={shortenText(restaurant.address || "주소 정보 없음")} // 주소 기본값 처리
                priceRange={restaurant.priceRange}
                reviewCount={restaurant.reviewCount}
                likeCount={restaurant.likeCount}
                usableDonation={restaurant.usableDonation}
                id={restaurant.storeId}
                showDistance={false} // 거리 정보를 숨기도록 설정
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            {noFavorites
              ? "좋아요한 음식점이 없습니다."
              : "목록을 불러오는 중입니다..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartPage;
