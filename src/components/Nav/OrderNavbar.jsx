import React from "react";
import AlarmIcon from "../../assets/img/Order/alarm.png";
import BackIcon from "../../assets/img/Nav/back.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OrderNavbar = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="order-header">
        <img
          src={BackIcon}
          className="back-img"
          alt="img"
          onClick={() => navigate(-1)}
        />

        <span className="header-title">{text}</span>
        <img src={AlarmIcon} className="alarm-img" alt="img" />
      </div>
    </div>
  );
};

export default OrderNavbar;
