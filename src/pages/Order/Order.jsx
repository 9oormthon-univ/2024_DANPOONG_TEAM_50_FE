import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PriceBox from "../../components/Order/PriceBox";
import MapIcon from "../../assets/img/Order/map.png";
import CallIcon from "../../assets/img/Order/call.png";
import TimeIcon from "../../assets/img/Order/time.png";
import MenuBox from "../../components/Order/MenuBox";
import HeartIcon from "../../assets/img/Order/like=off.svg";
import FilledHeartIcon from "../../assets/img/Order/like=on.svg";
import nonPrice from "../../assets/img/Order/price/none-pricebox.png";
import OrderNavbar from "../../components/Nav/OrderNavbar";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storeInfo, setStoreInfo] = useState([]);
  const [menuArr, setMenuArr] = useState([]);
  const [donateData, setDonateData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState(null);
  const [selectId, setSelectId] = useState(1);

  // 스토리지 끌어오기
  useEffect(() => {
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserRole(parsedData.role);
      setToken(parsedData["user-token"]);
      const params = new URLSearchParams(location.search);
      const id = params.get("key");
      if (id) {
        setStoreId(id);
      }
    }
  }, [location]);

  useEffect(() => {
    if (token && storeId) {
      const fetchStore = async () => {
        try {
          const response = await axios.get(
            `https://api.mymoo.site/api/v1/stores/${storeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { name, address, imagePath, likeable } = response.data;
          setStoreInfo(response.data);
          setStoreName(name);
          setIsLiked(!likeable);
        } catch (error) {
          console.error("Error fetching store info:", error);
        }
      };

      const fetchMenus = async () => {
        try {
          const response = await axios.get(
            `https://api.mymoo.site/api/v1/stores/${storeId}/menus`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMenuArr(response.data.menus);
        } catch (error) {
          console.error("Error fetching menus:", error);
        }
      };

      const fetchDonates = async () => {
        try {
          const response = await axios.get(
            `https://api.mymoo.site/api/v1/donations/stores/${storeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDonateData(response.data.donations);
        } catch (error) {
          console.error("에러확인:", error);
        }
      };

      fetchStore();
      fetchMenus();
      fetchDonates();
    }
  }, [token, storeId]);

  const toggleLike = async (e) => {
    e.stopPropagation();
    const updatedIsLiked = !isLiked;
    setIsLiked(updatedIsLiked);

    try {
      await axios.patch(
        `https://api.mymoo.site/api/v1/stores/${storeId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      const updatedFavorites = {
        ...storedFavorites,
        [storeId]: updatedIsLiked,
      };
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to toggle like status:", error);
      setIsLiked(!updatedIsLiked);
    }
  };

  const menuSelect = (id) => {
    setSelectId(id);
  };

  return (
    <div className="order-page">
      <OrderNavbar text={storeInfo.name} />
      <div>
        <div className="order-top">
          <div className="restaurant-img">
            <img
              className="img-width"
              src={storeInfo.imagePath || ""}
              alt="shop-top-img"
            />
          </div>
          <div className="restaurant-info flex-col">
            <div className="info-heart-icon" onClick={toggleLike}>
              <img
                src={isLiked ? FilledHeartIcon : HeartIcon}
                alt="favorite"
                className="heart-img"
              />
            </div>
            <div className="restaurant-title">{storeInfo.name}</div>
            <div className="restaurant-star">
              <span className="star-icon">★</span> 3.9
            </div>
            <div className="restaurant-place detail-txt">
              <img src={MapIcon} alt="icon" className="icon-img" />
              {storeInfo.address || "주소 정보 없음"}
            </div>
            <div className="restaurant-tel detail-txt">
              <img src={CallIcon} alt="icon" className="icon-img" />
              02-538-3011
            </div>
            <div className="restaurant-time detail-txt">
              <img src={TimeIcon} alt="icon" className="icon-img" />
              11:00-20:30
            </div>
            <div className="price-area">
              <div className="cum-price">
                누적 후원금{" "}
                <span className="bolder">{storeInfo.allDonation}원</span>
              </div>
              <div className="total-price">
                총 후원금{" "}
                <span className="yellow bolder">
                  {storeInfo.usableDonation}원
                </span>
              </div>
            </div>
            {userRole === "DONATOR" && (
              <div
                className="donate-btn"
                onClick={() =>
                  navigate("/donate", {
                    state: { storeName, storeId },
                  })
                }
              >
                식당 후원하기
              </div>
            )}
          </div>
        </div>
        <div className="menu-bar">
          <div
            onClick={() => menuSelect(1)}
            className={`toggle ${selectId === 1 ? "select" : ""}`}
          >
            메뉴
          </div>
          <div
            onClick={() => menuSelect(2)}
            className={`toggle ${selectId === 2 ? "select" : ""}`}
          >
            금액권 목록
          </div>
          <div
            onClick={() => menuSelect(3)}
            className={`toggle ${selectId === 3 ? "select" : ""}`}
          >
            리뷰
          </div>
        </div>

        <div className="order-bottom">
          {selectId === 1 && (
            <div className="menu-1-area">
              <div className="reco-menu-area">
                <div className="reco-menu">추천 메뉴</div>
                {menuArr.map((menu) => (
                  <MenuBox
                    key={menu.id}
                    menu={menu.name}
                    price={menu.price}
                    img={menu.imagePath}
                    des={menu.description}
                  />
                ))}
              </div>
              <div className="add-menu-area">
                <div className="add-menu">추가 메뉴</div>
                <MenuBox
                  key={-1}
                  menu="음료수"
                  price={2000}
                  img={
                    "https://i.namu.wiki/i/UUUicJzYIISF6z27yGzgl6c-2vdffpFx0fPSI1gWx00LShUqTOUd5z9mYqPsmO-o8NM5ED6tOVwIa4Jz7NIJ4Q.webp"
                  }
                  des={"시원한 음료수"}
                />
                <MenuBox
                  key={0}
                  menu="단무지"
                  price={1000}
                  img={
                    "https://ppss.kr/wp-content/uploads/2016/07/0-540x360.jpg"
                  }
                  des={"시원한 단무지"}
                />
              </div>
            </div>
          )}
          {selectId === 2 && (
            <div className="menu-2-area">
              {donateData.length > 0 ? (
                donateData.map((donate, idx) => (
                  <PriceBox
                    key={idx}
                    dId={donate.donationId}
                    price={donate.point}
                    donator={donate.donator}
                    date={donate.donatedAt}
                    place={storeInfo.name}
                  />
                ))
              ) : (
                <div className="empty-pricebox">
                  <div className="nonprice-img">
                    <img src={nonPrice} alt="img" className="img-width" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
