import React, { useEffect, useState } from "react";
import AlarmIcon from "../../assets/img/Main/alarm.svg"; 
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/img/Main/Search.svg";
import RightDirectionIcon from "../../assets/img/Main/right direction.svg"; 
import Ad1Icon from "../../assets/img/Main/ad.svg";
import Ad2Icon from "../../assets/img/Main/ad.svg";
import Ad3Icon from "../../assets/img/Main/ad.svg";
import profileImg from "../../assets/img/Main/profile.svg";
import profileImg1 from "../../assets/img/Main/profile1.svg";
import profileImg2 from "../../assets/img/Main/profile2.svg";
import RecentImg from "../../assets/img/Main/recent.svg";
import RecentImg2 from "../../assets/img/Main/recent2.svg";
import RecentImg3 from "../../assets/img/Main/recent3.svg";
import RecentImg4 from "../../assets/img/Main/recent4.svg";
import RecentImg5 from "../../assets/img/Main/recent5.svg";
import ReviewCard from "../../components/Main/ReviewCard";
import ShopCard from "../../components/Main/ShopCard";
import LogoIcon from "../../assets/img/Main/logo.svg";

//더미데이터
const dummyReviews = [
  {
    id: 1,
    storeName: "교촌치킨 압구정점",
    nickname: "민트초코",
    profileImg: profileImg1,
    rating: 4,
    userInfo: "09년생 / 여",
    date: "1일전",
    description: "사장님이 너무 친절하셨고 밥도 맛있게 잘먹었습니다. 최고에요!",
  },
  {
    id: 2,
    storeName: "한끼식당 용산",
    nickname: "규성",
    profileImg: profileImg2,
    rating: 5,
    userInfo: "91년생 / 남",
    date: "1주 전",
    description: "밑반찬도 메인메뉴도 맛있어요!여기선 꼭 제육볶음을 먹어보세요!",
  },
  {
    id: 3,
    storeName: "신의한국수 이수점",
    nickname: "도도희",
    profileImg: profileImg2,
    rating: 5,
    userInfo: "11년생 / 여",
    date: "5일전",
    description: "양이 엄청 많아요 ㄷㄷ 계란듬뿍 김밥 진짜 간도 딱 맞고 맛있어요",
  },
  {
    id: 4,
    storeName: "아차산떡볶이 사당점",
    nickname: "개굴이",
    profileImg: profileImg1,
    rating: 5,
    userInfo: "03년생 / 여",
    date: "2주 전",
    description: "종종 자주 먹고 있는데 항상 서비스를 잘 챙겨주세요 감사합니다!",
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
    name: "한솥 도시락 강남점",
    rating: 4.0,
    img: RecentImg2,
  },
  {
    id: 3,
    name: "부산돼지국밥 서초점",
    rating: 3.8,
    img: RecentImg3,
  },
  {
    id: 4,
    name: "서가앤쿸 강남역삼점",
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
    <div className="content-wrapper">
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
      <div className="banner">
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
</div>
  );
};

export default Main;
