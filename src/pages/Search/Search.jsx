import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/img/Search/Search.svg";
import LocateIcon from "../../assets/img/Search/loc.svg";
import BackIcon from "../../assets/img/Search/back.svg";
import TimeIcon from "../../assets/img/Search/time.svg";
import ShopCard from "../../components/Main/ShopCard";
import RecentImg from "../../assets/img/Main/recent.svg";

const dummyPopularRestaurants = [
  { id: 1, name: "엄마 김치찌개", rating: 4.4, img: RecentImg },
  { id: 2, name: "경양카츠 강남점", rating: 4.2, img: RecentImg },
  { id: 3, name: "경양카츠 강남점", rating: 4.2, img: RecentImg },
];

const SearchPage = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${formattedTime} 기준`);
    };
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!searchInput.trim()) return; 
    const updatedSearches = [searchInput, ...recentSearches.filter((item) => item !== searchInput)]; // 중복 제거
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setSearchInput(""); 
  };

  const handleRemoveTag = (search) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="search-page">
      <img src={BackIcon} alt="뒤로가기" className="back-icon" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="음식점, 메뉴, 주소를 검색해보세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} 
        />
        <img
          src={LocateIcon}
          alt="위치 아이콘"
          className="icon locate-icon"
          onClick={handleSearch}
        />
        <img
          src={SearchIcon}
          alt="검색"
          className="icon search-icon"
          onClick={handleSearch}
        />
      </div>

      <section className="recent-searches">
        <div className="header-row">
          <h4>최근 검색어</h4>
          <button className="clear-all" onClick={handleClearAll}>
            전체 지우기
          </button>
        </div>
        <div className="tags">
          {recentSearches.map((search, index) => (
            <span key={index} className="search-tag">
              {search}{" "}
              <button className="remove-tag" onClick={() => handleRemoveTag(search)}>
                x
              </button>
            </span>
          ))}
        </div>
      </section>

      <section className="trending-section">
        <div className="section-header">
          <h3>실시간 검색어</h3>
          <span className="update-time">{currentTime}</span>
        </div>
        <img src={TimeIcon} alt="시간 이미지" className="time-icon" />
      </section>

      <section className="popular-restaurants">
        <h3>내 주변 인기 식당</h3>
        <div className="shop-list">
          {dummyPopularRestaurants.map((shop) => (
            <ShopCard key={shop.id} imgSrc={shop.img} name={shop.name} rating={shop.rating} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
