import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LocateIcon from "../../assets/img/Map/locate.svg";
import BackIcon from "../../assets/img/Map/back.svg";
import SearchIcon from "../../assets/img/Map/Search.svg";
import AlarmIcon from "../../assets/img/Map/alarm.svg";
import HereIcon from "../../assets/img/Map/here.svg";
import MapCard from "../../components/Map/MapCard";

const Map = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MzIyNTY5NDUsImV4cCI6MTczMjI1ODc0NSwidXNlcklkIjoyLCJhdXRoIjoiRE9OQVRPUiJ9.knLQu0jPt9BlkqLQjmCK-NfsvtLtCDVl6ogeSHHPMvZfHcTuOvL6OxoqlbX4_mj56E5Cm4n0zogaWxZ8dERovA";

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=43c54f0fc07ce690e0bdb4a55145d1ab&libraries=services`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
      };
    };

    loadKakaoMap();
  }, []);

  useEffect(() => {
    if (selectedStore && map) {
      if (marker) {
        marker.setMap(null);
      }

      const markerPosition = new window.kakao.maps.LatLng(
        selectedStore.latitude,
        selectedStore.longitude,
      );
      const newMarker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: new window.kakao.maps.MarkerImage(
          HereIcon,
          new window.kakao.maps.Size(50, 70),
        ),
      });

      newMarker.setMap(map);
      map.setLevel(3);
      map.panTo(markerPosition);
      setMarker(newMarker);
    }
  }, [selectedStore, map]);

  const fetchStores = async (params) => {
    try {
      const response = await axios.get("https://api.mymoo.site/api/v1/stores", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ...params,
          size: 20,
          sort: "asc",
          sortby: "name",
        },
      });

      const fetchedStores = response.data.stores.map((store) => ({
        ...store,
        phone: "02-0616-1014",
        openingHours: "10:00 - 21:00",
      }));
      setStores(fetchedStores);

      if (params.keyword && fetchedStores.length > 0) {
        setSelectedStore(fetchedStores[0]);
      } else {
        setSelectedStore(null);
      }

      setIsCardVisible(fetchedStores.length > 0);
    } catch (error) {
      console.error("Error fetching stores:", error);
      alert("가게 데이터를 불러오지 못했습니다.");
    }
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      fetchStores({ keyword });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
          map.panTo(locPosition);
          fetchStores({ lat: latitude, logt: longitude });
        },
        () => alert("현재 위치를 가져올 수 없습니다."),
      );
    } else {
      alert("브라우저에서 현재 위치를 지원하지 않습니다.");
    }
  };

  const handleNext = () => {
    if (stores.length > 0) {
      const nextIndex = (currentIndex + 1) % stores.length;
      setCurrentIndex(nextIndex);
      setSelectedStore(stores[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (stores.length > 0) {
      const prevIndex = (currentIndex - 1 + stores.length) % stores.length;
      setCurrentIndex(prevIndex);
      setSelectedStore(stores[prevIndex]);
    }
  };

  return (
    <div className="map-container">
      <div className="top-bar">
        <img
          src={BackIcon}
          alt="Back"
          className="icon back-icon"
          onClick={() => navigate(-1)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          className="icon search-icon"
          onClick={() => navigate("/search")}
        />
        <img src={AlarmIcon} alt="Alarm" className="icon alarm-icon" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="지역, 가게명을 검색해보세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="Search"
          className="icon search-icon"
          onClick={handleSearch}
        />
      </div>
      <div id="map" className="map"></div>
      <img
        src={LocateIcon}
        alt="Locate Me"
        id="locate-icon"
        className={`locate-icon ${isCardVisible ? "card-visible" : ""}`}
        onClick={handleCurrentLocation}
      />
      {isCardVisible && (
        <div className="banner">
          <button className="prev-btn" onClick={handlePrev}>
            ◀
          </button>
          <div className="card-wrapper">
            <MapCard store={stores[currentIndex]} />
          </div>
          <button className="next-btn" onClick={handleNext}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
