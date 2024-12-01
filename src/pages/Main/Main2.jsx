import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlarmIcon from "../../assets/img/Main/alarm.svg";
import SearchIcon from "../../assets/img/Main/Search.svg";

import Ad1Icon from "../../assets/img/Main/ad4.png";
import Ad2Icon from "../../assets/img/Main/ad3.png";
import RecentImg from "../../assets/img/Main/recent.svg";
import RecentImg2 from "../../assets/img/Main/recent2.svg";
import RecentImg3 from "../../assets/img/Main/recent3.svg";
import RecentImg4 from "../../assets/img/Main/recent4.svg";
import RecentImg5 from "../../assets/img/Main/recent5.svg";
import ShopCard from "../../components/Main/ShopCard";
import LogoIcon from "../../assets/img/Main/logo.svg";
import Donation from "../../components/Main/Donation";
import Rank from "../../components/Main/Rank";
import Statistics from "../../components/Main/statistics";

const dummyRecentShops = [
  {
    id: 1,
    name: "신전 떡볶이 강남점",
    rating: 4.2,
    img: RecentImg,
  },
  {
    id: 2,
    name: "한솥 도시락 강남점",
    rating: 4.0,
    img: RecentImg2,
  },
  {
    id: 3,
    name: "짱돼지국밥 서초점",
    rating: 3.8,
    img: RecentImg3,
  },
  {
    id: 4,
    name: "서가앤쿸 강남점",
    rating: 4.6,
    img: RecentImg4,
  },
  {
    id: 5,
    name: "GS25 강남점",
    rating: 4.1,
    img: RecentImg5,
  },
];

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const getAccessToken = async () => {
  try {
    const storedData = JSON.parse(localStorage.getItem("mymoo")) || {};
    let accessToken = storedData["user-token"];
    const refreshToken = storedData["refresh-token"];

    if (!accessToken && refreshToken) {
      console.log("Access token expired. Refreshing token...");
      const response = await axios.post(
        "https://api.mymoo.site/api/v1/auth/refresh",
        {
          refreshToken,
        }
      );

      accessToken = response.data.accessToken;
      storedData["user-token"] = accessToken;
      localStorage.setItem("mymoo", JSON.stringify(storedData));
    }

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

const Main2 = () => {
  const [currentLocation, setCurrentLocation] =
    useState("위치 정보를 가져오는 중...");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [donationData, setDonationData] = useState(null);
  const [topRankers, setTopRankers] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const fetchLocation = async () => {
    try {
      const kakaoMaps = await new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao.maps);
        } else {
          const script = document.createElement("script");
          script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=43c54f0fc07ce690e0bdb4a55145d1ab&libraries=services&autoload=false";
          script.async = true;
          script.onload = () =>
            window.kakao.maps.load(() => resolve(window.kakao.maps));
          script.onerror = () => reject(new Error("카카오 맵 로드 실패"));
          document.head.appendChild(script);
        }
      });

      if (!navigator.geolocation) {
        setCurrentLocation("위치 정보를 사용할 수 없습니다.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new kakaoMaps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === kakaoMaps.services.Status.OK) {
              setCurrentLocation(
                result[0]?.address?.address_name || "주소 정보 없음"
              );
            } else {
              setCurrentLocation("주소 정보를 불러올 수 없습니다.");
            }
          });
        },
        () => {
          setCurrentLocation("위치 정보를 불러올 수 없습니다.");
        }
      );
    } catch (error) {
      console.error("위치 정보 로드 실패:", error);
      setCurrentLocation("위치 정보를 불러올 수 없습니다.");
    }
  };

  const fetchDonationData = async () => {
    try {
      const token = await getAccessToken();
      setAccessToken(token);
      if (!token) {
        console.error("인증 토큰을 가져올 수 없습니다.");
        return;
      }

      const response = await axios.get(
        "https://api.mymoo.site/api/v1/donations/rankings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { donatorRanking, rankings } = response.data;

      setDonationData({
        name: donatorRanking.donator,
        profileImg: donatorRanking.profileImageUrl,
        donationAmount: `${donatorRanking.totalDonation.toLocaleString()}원`,
        lastDonationDate: new Date(
          donatorRanking.lastDonatedAt
        ).toLocaleDateString("ko-KR"),
        rank: donatorRanking.rank,
      });

      const formattedRankers = rankings.donations.map((donation) => ({
        name: donation.donator,
        avatar: donation.profileImageUrl,
        donationAmount: donation.totalDonation,
        lastDonationDate: new Date(donation.lastDonatedAt).toLocaleDateString(
          "ko-KR"
        ),
        birthYear: "모름",
        gender: "모름",
      }));

      setTopRankers(formattedRankers);
    } catch (error) {
      console.error("후원 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchDonationData();
  }, []);

  const banners = [Ad1Icon, Ad2Icon];

  useInterval(() => {
    setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, 3000);

  return (
    <div className="content-wrapper scroll-hidden-but-scrollable">
      <div className="home-container">
        <header className="header real-header">
          <img src={LogoIcon} alt="로고" className="logo" />
          <div className="icons">
            <img
              src={SearchIcon}
              alt="검색 아이콘"
              className="icon"
              onClick={() => navigate("/search")}
            />
            <img src={AlarmIcon} alt="알림 아이콘" className="icon" />
          </div>
        </header>

        <div className="banner-container">
          <div
            className="banner-slider"
            style={{
              transform: `translateX(-${bannerIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                className="banner-image"
                alt={`배너 ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="location">
          <span>{currentLocation}</span>
        </div>
        <section className="reviews">
          <div className="section-header">
            <h3>후원 랭킹</h3>
          </div>
          <div className="reviews-content">
            <div className="donation-card">
              {donationData ? (
                <Donation user={donationData} />
              ) : (
                <p>로딩 중...</p>
              )}
            </div>
            <div className="rank-card">
              {topRankers.length > 0 ? (
                <Rank topRankers={topRankers} />
              ) : (
                <p>랭킹 정보를 불러오는 중...</p>
              )}
            </div>
          </div>
        </section>

        <div className="divider" />

        {accessToken && <Statistics accessToken={accessToken} />}

        <div className="divider" />

        <section className="recent-shops">
          <h3>최근 후원한 가게</h3>
          <div className="shop-list">
            {dummyRecentShops.map((shop) => (
              <ShopCard
                key={shop.id}
                imgSrc={shop.img}
                name={shop.name}
                rating={shop.rating}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main2;
