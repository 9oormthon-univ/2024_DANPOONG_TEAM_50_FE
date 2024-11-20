import React from "react";
import AlarmIcon from "../../assets/img/Order/alarm.png";
import BackIcon from "../../assets/img/Nav/back.png";
import { Link } from "react-router-dom";
const OrderNavbar = ({ text }) => {
  return (
    <div>
      <div className="order-header">
        <Link to="/">
          <img src={BackIcon} className="back-img" alt="img" />
        </Link>
        <span className="header-title">{text}</span>
        <img src={AlarmIcon} className="alarm-img" alt="img" />
      </div>
    </div>
  );
};

export default OrderNavbar;
