import React from "react";
import FinishImg from "../../assets/img/thanks/finish.png";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import { useNavigate } from "react-router-dom";
const ThanksFinish = () => {
  const navigate = useNavigate("");
  return (
    <div className="thankfinish-page">
      <OrderNavbar text="감사편지 전송완료" />
      <div className="thankfinish-main">
        <div className="finish-img">
          <img src={FinishImg} alt="img" className="img-width" />
        </div>
        <div className="ok-btn" onClick={() => navigate("/main")}>
          확인
        </div>
      </div>
    </div>
  );
};
export default ThanksFinish;
