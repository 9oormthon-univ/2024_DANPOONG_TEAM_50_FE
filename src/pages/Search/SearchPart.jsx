import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchIcon from "../../assets/img/Search/Search.svg";
import LocateIcon from "../../assets/img/Search/loc.svg";
import BackIcon from "../../assets/img/Search/back.svg";
import UnderIcon from "../../assets/img/Search/under.svg";
import SearchCard from "../../components/Search/SearchCard";

const SearchPage2 = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filterRating, setFilterRating] = useState(false);
  const [selectedSort, setSelectedSort] = useState("좋아요 많은 순");
  const [priceOrder, setPriceOrder] = useState("고가순");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userLocation, setUserLocation] = useState({ logt: null, lat: null });
  const [noResults, setNoResults] = useState(false);

  const location = useLocation();

  const fetchRestaurants = async (params) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("mymoo"));
      if (!storedData || !storedData["user-token"]) {
        console.error("Access token not found. Please log in.");
        return;
      }

      const accessToken = storedData["user-token"];

      const response = await axios.get("https://api.mymoo.site/api/v1/stores", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      const { stores } = response.data;

      setRestaurants(stores);
      setFilteredRestaurants(stores);
      setNoResults(stores.length === 0);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");
    const latitude = queryParams.get("latitude");
    const longitude = queryParams.get("longitude");

    // 위치 정보와 키워드로 초기 검색 실행
    if (latitude && longitude) {
      setUserLocation({ logt: longitude, lat: latitude });
      const params = { lat: latitude, logt: longitude };
      if (keyword) {
        params.keyword = keyword;
        setSearchKeyword(keyword);
      }
      fetchRestaurants(params);
    }
  }, [location.search]);

  useEffect(() => {
    if (filterRating) {
      const filtered = restaurants.filter((restaurant) => restaurant.stars >= 4.0);
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [filterRating, restaurants]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    const params = { lat: userLocation.lat, logt: userLocation.logt };
    if (searchKeyword.trim()) {
      params.keyword = searchKeyword;
    }
    if (userLocation.lat && userLocation.logt) {
      fetchRestaurants(params);
      setNoResults(false);
    } else {
      console.error("Location is required for search.");
      setNoResults(true);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, logt: longitude });
          fetchRestaurants({ lat: latitude, logt: longitude });
          setNoResults(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const toggleSortModal = () => {
    setSortModalVisible(!sortModalVisible);
  };

  const handleSort = (sortType) => {
    let sortedRestaurants = [];
    if (sortType === "좋아요 많은 순") {
      sortedRestaurants = [...filteredRestaurants].sort((a, b) => b.likeCount - a.likeCount);
    } else if (sortType === "높은 후원금액 순") {
      sortedRestaurants = [...filteredRestaurants].sort((a, b) => b.usableDonation - a.usableDonation);
    } else if (sortType === "리뷰 많은 순") {
      sortedRestaurants = [...filteredRestaurants].sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredRestaurants(sortedRestaurants);
    setSelectedSort(sortType);
    setSortModalVisible(false);
  };

  const handleFilterRating = () => {
    setFilterRating(!filterRating);
  };

  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div className="search-page">
      <img
        src={BackIcon}
        alt="뒤로가기"
        className="back-icon"
        onClick={handleBackButtonClick}
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="음식점, 메뉴, 주소를 검색해보세요"
          value={searchKeyword}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <img
          src={LocateIcon}
          alt="위치 아이콘"
          className="icon locate-icon"
          onClick={handleLocateClick}
        />
        <img
          src={SearchIcon}
          alt="검색"
          className="icon search-icon"
          onClick={handleSearch}
        />
      </div>
      <div className="sort-buttons">
        <div className="left-buttons">
          <button
            className={`sort-button ${filterRating ? "active" : ""}`}
            onClick={handleFilterRating}
          >
            4.0 이상<span>★</span>
          </button>
        </div>
        <button className="sort-button" onClick={toggleSortModal}>
          {selectedSort}
          <img src={UnderIcon} alt="정렬 아이콘" />
        </button>
      </div>
      <div className="restaurant-list-container">
        {filteredRestaurants.length > 0 && !noResults ? (
          <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => (
              <SearchCard
                key={restaurant.storeId}
                imgSrc={restaurant.imagePath}
                title={restaurant.name}
                rating={restaurant.stars}
                location={restaurant.address}
                distance={restaurant.distance}
                priceRange={restaurant.priceRange}
                reviewCount={restaurant.reviewCount}
                likeCount={restaurant.likeCount}
                totalDonation={restaurant.usableDonation}
                id={restaurant.storeId}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">검색 결과가 없습니다</div>
        )}
      </div>
      {sortModalVisible && (
        <>
          <div className="modal-overlay" onClick={toggleSortModal}></div>
          <div className="modal-content">
            <h3>정렬</h3>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="좋아요 많은 순"
                  checked={selectedSort === "좋아요 많은 순"}
                  onChange={() => handleSort("좋아요 많은 순")}
                />
                좋아요 많은 순
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="높은 후원금액 순"
                  checked={selectedSort === "높은 후원금액 순"}
                  onChange={() => handleSort("높은 후원금액 순")}
                />
                높은 후원금액 순
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="리뷰 많은 순"
                  checked={selectedSort === "리뷰 많은 순"}
                  onChange={() => handleSort("리뷰 많은 순")}
                />
                리뷰 많은 순
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage2;
