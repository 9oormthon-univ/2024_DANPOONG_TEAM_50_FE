import React from "react";
import ThanksBg from "../../assets/img/thanks/bg.png";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import { useNavigate } from "react-router-dom";
const Thanks = () => {
  const navigate = useNavigate();
  return (
    <div className="thanks-page">
      <OrderNavbar text="감사편지 쓰기" />
      <div className="thanks-bg">
        <img src={ThanksBg} alt="img" className="img-width" />
      </div>
      <div className="thanks-main">
        <div className="thanks-letter">
          <input
            className="letter-input"
            placeholder="후원자에게 감사한 마음을 전해보세요"
          />
        </div>
        <div className="thanks-btn" onClick={() => navigate("/thanks/finish")}>
          보내기
        </div>
      </div>
    </div>
  );
};
export default Thanks;
