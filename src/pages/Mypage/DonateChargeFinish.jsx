import React from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import chargeIcon from "../../assets/img/Mypage/chargeIcon.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // 데이터를 받기 위해 import

const DonateChargeFinish = () => {
  const navigate = useNavigate();
  const handleCloseBtnClick = () => {
    navigate("/my");
  };

  const location = useLocation(); // 전달받은 데이터 가져오기

  const numericAmount = location.state.price;
  const currentDate = location.state.date;
  return (
    <div className="donatechargefinish-page">
      <OrderNavbar text="충전완료" />
      <div className="donatecharge-main">
        <div className="charge-icon-section">
          <img className="charge-icon" src={chargeIcon} alt="충전완료 캐릭터" />
          <p className="charge-message">충전이 완료되었습니다</p>
        </div>
        <div className="button-section">
          <button className="close-btn" onClick={handleCloseBtnClick}>
            닫기
          </button>
          <button className="view-btn">금액권 보관함 보기</button>
        </div>
        <div className="charge-info-section">
          <div className="charge-info">
            <span className="label">충전날짜</span>
            <span className="value">{currentDate}</span>
          </div>
          <div className="charge-info">
            <span className="label">충전금액</span>
            <span className="value">{numericAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateChargeFinish;
