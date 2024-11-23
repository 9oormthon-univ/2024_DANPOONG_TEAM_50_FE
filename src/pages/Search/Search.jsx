import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocateIcon from "../../assets/img/Search/loc.svg";
import SearchIcon from "../../assets/img/Search/Search.svg";
import BackIcon from "../../assets/img/Search/back.svg";
import TimeIcon from "../../assets/img/Search/time.svg";

const SearchPage = () => {
  const navigate = useNavigate();
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

    // 위치 정보를 포함해 키워드 검색
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const updatedSearches = [
            searchInput,
            ...recentSearches.filter((item) => item !== searchInput),
          ];
          setRecentSearches(updatedSearches);
          localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

          navigate(
            `/searchpart?keyword=${encodeURIComponent(
              searchInput
            )}&latitude=${latitude}&longitude=${longitude}`
          );
        },
        (error) => {
          alert("현재 위치를 가져올 수 없습니다. 권한을 확인해주세요.");
          console.error(error);
        }
      );
    } else {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
    }

    setSearchInput("");
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        navigate(`/searchpart?latitude=${latitude}&longitude=${longitude}`);
      },
      (error) => {
        alert("현재 위치를 가져올 수 없습니다. 권한을 확인해주세요.");
        console.error(error);
      }
    );
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <img
          src={LocateIcon}
          alt="위치 아이콘"
          className="icon locate-icon"
          onClick={handleLocate}
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
              <button
                className="remove-tag"
                onClick={() => handleRemoveTag(search)}
              >
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
    </div>
  );
};

export default SearchPage;
