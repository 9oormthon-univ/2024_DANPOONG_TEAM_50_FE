import { React, useEffect, useState } from "react";
import Price1 from "../../assets/img/Order/price/1.png";
import Price2 from "../../assets/img/Order/price/2.png";
import Price3 from "../../assets/img/Order/price/3.png";
import { useNavigate } from "react-router-dom";
const PriceBox = ({ price, donator, date, place }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserRole(parsedData.role);
    }
  }, []);
  const goPay = () => {
    if (userRole === "CHILD") {
      navigate("/orderpay", { state: { price, donator, date, place } });
    } else {
      alert("아동만 사용 가능합니다");
    }
  };
  let priceImg;

  if (price <= 10000) {
    priceImg = Price1;
  } else if (price >= 11000 && price <= 15000) {
    priceImg = Price2;
  } else if (price >= 16000) {
    priceImg = Price3;
  }
  const formattedPrice = price.toLocaleString();

  return (
    <div onClick={goPay}>
      <div className="donate-price-box">
        <div className="donate-price-img">
          <img src={priceImg} alt="이미지" className="img-width" />
        </div>
        <div className="donate-price-detail">
          <div className="donate-price-title">{formattedPrice}원권</div>
          <div className="price-donator">
            후원자 <span className="grey">{donator}님</span>
          </div>
          <div className="donate-price-date">후원날짜 {date}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceBox;
