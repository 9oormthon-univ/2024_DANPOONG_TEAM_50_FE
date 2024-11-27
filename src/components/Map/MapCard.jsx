import React from "react";
import { useNavigate } from "react-router-dom";
import LocIcon from "../../assets/img/Map/loc.svg";
import CallIcon from "../../assets/img/Map/call.svg";
import ClockIcon from "../../assets/img/Map/clock.svg";

const MapCard = ({ store }) => {
  const navigate = useNavigate();

  if (!store) {
    return null;
  }

  const { storeId, name, address, phone, openingHours } = store;

  const truncateAddress = (text, length) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const handleCardClick = () => {
    if (!storeId) {
      console.error("Store ID not found. Cannot navigate to the store page.");
      return;
    }
    navigate(`/order?key=${storeId}`); 
  };

  return (
    <div
      className="bottom-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h3>{name || "가게 이름 없음"}</h3>
      <div className="card-row">
        <img src={LocIcon} alt="주소" className="icon" />
        <p>{truncateAddress(address || "주소 정보 없음", 30)}</p>
      </div>
      <div className="card-row">
        <img src={CallIcon} alt="전화번호" className="icon" />
        <p>{phone || "정보 없음"}</p>
      </div>
      <div className="card-row">
        <img src={ClockIcon} alt="영업시간" className="icon" />
        <p>{openingHours || "정보 없음"}</p>
      </div>
    </div>
  );
};

export default MapCard;
