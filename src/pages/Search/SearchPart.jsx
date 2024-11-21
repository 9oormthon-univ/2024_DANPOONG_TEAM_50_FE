import React, { useState } from "react";
import SearchIcon from "../../assets/img/Search/Search.svg";
import LocateIcon from "../../assets/img/Search/loc.svg";
import BackIcon from "../../assets/img/Search/back.svg";
import RecentImg from "../../assets/img/Main/recent.svg";
import UnderIcon from "../../assets/img/Search/under.svg";
import SearchCard from "../../components/Search/SearchCard";

const dummyPopularRestaurants = [
  {
    id: 1,
    name: "엄마 김치찌개",
    rating: 4.4,
    priceRange: "8000~12000",
    distance: 540,
    location: "서울 강남구 강남대로84길 6 1층",
    reviewCount: 12,
    imgSrc: RecentImg,
    donationAmount: 180000,
  },
  {
    id: 2,
    name: "경양카츠 강남점",
    rating: 4.2,
    priceRange: "10000~15000",
    distance: 630,
    location: "서울 강남구 강남대로90길 2",
    reviewCount: 8,
    imgSrc: RecentImg,
    donationAmount: 120000,
  },
  {
    id: 3,
    name: "김밥천국",
    rating: 3.9,
    priceRange: "5000~7000",
    distance: 430,
    location: "서울 강남구 역삼로 24",
    reviewCount: 20,
    imgSrc: RecentImg,
    donationAmount: 50000,
  },
];

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState(dummyPopularRestaurants);
  const [filterRating, setFilterRating] = useState(false);
  const [selectedSort, setSelectedSort] = useState("좋아요 많은 순");
  const [priceOrder, setPriceOrder] = useState("고가순");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const handleSortPrice = () => {
    const nextOrder = priceOrder === "고가순" ? "저가순" : "고가순";
    setPriceOrder(nextOrder);

    const sortedRestaurants = [...restaurants].sort((a, b) =>
      nextOrder === "고가순"
        ? b.priceRange.split("~")[0] - a.priceRange.split("~")[0]
        : a.priceRange.split("~")[0] - b.priceRange.split("~")[0]
    );
    setRestaurants(sortedRestaurants);
  };

  const toggleSortModal = () => {
    setSortModalVisible(!sortModalVisible);
  };

  const handleSort = (sortType) => {
    let sortedRestaurants = [];
    if (sortType === "좋아요 많은 순") {
      sortedRestaurants = [...restaurants].sort((a, b) => b.donationAmount - a.donationAmount);
    } else if (sortType === "높은 후원금액 순") {
      sortedRestaurants = [...restaurants].sort((a, b) => b.donationAmount - a.donationAmount);
    } else if (sortType === "리뷰 많은 순") {
      sortedRestaurants = [...restaurants].sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setRestaurants(sortedRestaurants);
    setSelectedSort(sortType);
    setSortModalVisible(false);
  };

  const handleFilterRating = () => {
    setFilterRating(!filterRating);
    if (!filterRating) {
      const filteredRestaurants = dummyPopularRestaurants.filter((r) => r.rating >= 4.0);
      setRestaurants(filteredRestaurants);
    } else {
      setRestaurants(dummyPopularRestaurants);
    }
  };

  return (
    <div className="search-page">
      <img src={BackIcon} alt="뒤로가기" className="back-icon" />
      <div className="search-bar">
        <input type="text" placeholder="음식점, 메뉴, 주소를 검색해보세요" />
        <img src={LocateIcon} alt="위치 아이콘" className="icon locate-icon" />
        <img src={SearchIcon} alt="검색" className="icon search-icon" />
      </div>

      <div className="sort-buttons">
        <div className="left-buttons">
          <button className="sort-button" onClick={handleSortPrice}>
            가격 {priceOrder}
            <img
              src={UnderIcon}
              alt="가격 아이콘"
              className={`arrow-icon ${priceOrder === "고가순" ? "rotated" : ""}`}
            />
          </button>
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

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <SearchCard
            key={restaurant.id}
            imgSrc={restaurant.imgSrc}
            title={restaurant.name}
            rating={restaurant.rating}
            location={restaurant.location}
            distance={restaurant.distance}
            priceRange={restaurant.priceRange}
            reviewCount={restaurant.reviewCount}
            donationAmount={restaurant.donationAmount}
          />
        ))}
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
                  checked={selectedSort === "좋아요 많은 순ㅤ"}
                  onChange={() => handleSort("좋아요 많은 순ㅤ")}
                />
                좋아요 많은 순ㅤ
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="높은 후원금액 순"
                  checked={selectedSort === "높은 후원금액 순ㅤ"}
                  onChange={() => handleSort("높은 후원금액 순ㅤ")}
                />
                높은 후원금액 순ㅤ
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="리뷰 많은 순"
                  checked={selectedSort === "리뷰 많은 순ㅤ"}
                  onChange={() => handleSort("리뷰 많은 순ㅤ")}
                />
                리뷰 많은 순ㅤ
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
