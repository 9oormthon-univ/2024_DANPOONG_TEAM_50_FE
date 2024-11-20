import React, { useEffect, useState } from "react";
import AlarmIcon from "../../assets/img/Main/alarm.svg"; 
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/img/Main/Search.svg";
import RightDirectionIcon from "../../assets/img/Main/right direction.svg"; 
import Ad1Icon from "../../assets/img/Main/ad.svg";
import Ad2Icon from "../../assets/img/Main/ad.svg";
import Ad3Icon from "../../assets/img/Main/ad.svg";
import profileImg from "../../assets/img/Main/profile.svg";
import RecentImg from "../../assets/img/Main/recent.svg";
import ReviewCard from "../../components/Main/ReviewCard";
import ShopCard from "../../components/Main/ShopCard";

//테스트용 더미데이터
const dummyReviews = [
  {
    id: 1,
    storeName: "철새타령 한우곰탕집",
    nickname: "민트초코",
    profileImg: profileImg,
    rating: 4,
    userInfo: "09년생 / 여",
    date: "2주 전",
    description: "사장님이 너무 친절하고 맛도 맛있게 끓여져있습니다. 최고예요! 이야이야오",
  },
  {
    id: 2,
    storeName: "한끼식당 용산",
    nickname: "홍길동",
    profileImg: profileImg,
    rating: 3,
    userInfo: "91년생 / 남",
    date: "3주 전",
    description: "밥반찬도 예쁘게 나와요! 여기는 절 재방문했을 정도로 좋아요.",
  },
  {
    id: 3,
    storeName: "알아 곱창집",
    nickname: "곱창러버",
    profileImg: profileImg,
    rating: 5,
    userInfo: "85년생 / 여",
    date: "1달 전",
    description: "알이 많고 깔끔한 곱창.",
  },
];

const dummyRecentShops = [
  {
    id: 1,
    name: "신전 떡볶이 강남점",
    rating: 4.2,
    img: RecentImg,
  },
  {
    id: 2,
    name: "한솥 도시락",
    rating: 4.0,
    img: RecentImg,
  },
  {
    id: 3,
    name: "부산 돼지국밥",
    rating: 4.5,
    img: RecentImg,
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

const Main = () => {
  const [currentLocation, setCurrentLocation] = useState("위치 정보를 가져오는 중");
  const [bannerIndex, setBannerIndex] = useState(0);
  const navigate = useNavigate();

  const banners = [Ad1Icon, Ad2Icon, Ad3Icon];

  useInterval(() => {
    setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, 3000);

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;
            await new Promise((resolve) => {
              if (window.kakao && window.kakao.maps) {
                resolve();
              } else {
                const script = document.createElement("script");
                script.onload = () => {
                  window.kakao.maps.load(() => {
                    resolve();
                  });
                };
                document.head.appendChild(script);
              }
            });

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(longitude, latitude, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setCurrentLocation(result[0].address.address_name);
              } else {
                setCurrentLocation("주소 정보를 불러올 수 없습니다.");
              }
            });
          },
          () => {
            setCurrentLocation("위치 정보를 불러올 수 없습니다.");
          }
        );
      } else {
        setCurrentLocation("위치 정보를 사용할 수 없습니다.");
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1>로고</h1>
        <div className="icons">
        <img src={SearchIcon} alt="검색 아이콘" className="icon" onClick={() => navigate('/search')} />
          <img src={AlarmIcon} alt="알림 아이콘" className="icon" />
        </div>
      </header>

      <div className="banner-container">
        <div className="banner" > 
          {banners.map((banner, index) => (
            <img key={index} src={banner} className="banner-image" />
          ))}
        </div>
      </div>

      <div className="location">
        <span>{currentLocation}</span>
      </div>

      <section className="reviews">
        <div className="section-header">
          <h3>리뷰 모아보기</h3>
          <div className="more">
            <span>더보기</span>
            <img src={RightDirectionIcon} alt="더보기 아이콘" className="right-icon" />
          </div>
        </div>
        <div className="review-list">
          {dummyReviews.map((review) => (
            <ReviewCard
              key={review.id}
              storeName={review.storeName}
              nickname={review.nickname}
              profileImg={review.profileImg}
              rating={review.rating}
              description={review.description}
              userInfo={review.userInfo}
              date={review.date}
            />
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="recent-shops">
        <h3>최근 이용한 가게</h3>
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
  );
};

export default Main;
