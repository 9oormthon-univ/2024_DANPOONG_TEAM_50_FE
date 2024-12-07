import React, { useState, useEffect } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import DonateBox from "../../components/Order/DonateBox";
import addDonate from "../../assets/img/Order/add-donate.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Donate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null); // 선택된 가격을 추적
  const store = location.state.storeName;
  const storeId = location.state.storeId;
  const [token, setToken] = useState(0);

  // 스토리지 불러오기
  useEffect(() => {
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData["user-token"]);
      console.log(storeId);
    }
  }, [token]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitDonate = async () => {
    if (isSubmitting) return; // 이미 제출 중이라면 종료
    setIsSubmitting(true); // 제출 중으로 설정
    if (token) {
      try {
        await axios.post(
          `https://api.mymoo.site/api/v1/donations/stores/${storeId}`,
          {
            point: selectedPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // 올바른 위치로 이동
            },
          }
        );
        navigate("/donate/finish", {
          state: { selectedPrice, store, storeId },
        });
      } catch (error) {
        console.error("에러 확인:", error);
        if (error.code === "ERR_BAD_REQUEST") {
          alert("포인트가 부족합니다. 금액을 충전 후 후원해주세요😊");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("토큰 에러");
      setIsSubmitting(false);
    }
  };

  const handleSelect = (price) => {
    setSelectedPrice(price); // 선택된 price 업데이트
    console.log(`후원금액: ${price}`);
  };

  const prices = [5000, 7000, 10000, 15000, 20000, 30000, 40000, 50000];

  return (
    <div className="donate-page">
      <OrderNavbar text={"후원하기"} />
      <div className="donate-page-top">
        {prices.map((price, index) => (
          <DonateBox
            key={index}
            price={price}
            isChecked={selectedPrice === price} // 현재 선택된 가격과 비교
            onSelect={() => handleSelect(price)} // 클릭 시 선택된 가격 설정
          />
        ))}
        <div>
          <img src={addDonate} alt="img" className="img-width" />
        </div>
      </div>
      <div className="donate-btn-area">
        <div className="donate-btn" onClick={submitDonate}>
          금액권 후원하기
        </div>
      </div>
    </div>
  );
};

export default Donate;
