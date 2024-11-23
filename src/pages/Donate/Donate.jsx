import React, { useState } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import DonateBox from "../../components/Order/DonateBox";
import addDonate from "../../assets/img/Order/add-donate.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Donate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null); // 선택된 가격을 추적
  const store = location.state.storeName;
  const storeId = location.state.storeId;
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
        <div
          className="donate-btn"
          onClick={() =>
            navigate("/donate/finish", {
              state: { selectedPrice, store, storeId },
            })
          }
        >
          금액권 후원하기
        </div>
      </div>
    </div>
  );
};

export default Donate;
