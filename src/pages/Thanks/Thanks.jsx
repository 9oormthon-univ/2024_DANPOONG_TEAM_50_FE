import { React, useEffect, useState } from "react";
import ThanksBg from "../../assets/img/thanks/bg.png";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const Thanks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(0);
  const [message, setMessage] = useState("");

  // 스토리지 불러오기
  useEffect(() => {
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData["user-token"]);
    }
  }, [token]);

  const submitThanks = async () => {
    if (!message.trim()) {
      alert("감사 메시지를 1문장 이상 입력해주세요!");
      return;
    }

    if (token) {
      try {
        await axios.patch(
          `https://api.mymoo.site/api/v1/donation-usages`,
          {
            donationId: location.state.dId,
            message: message, // 전송할 데이터
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // 올바른 위치로 이동
            },
          }
        );

        navigate("/thanks/finish");
      } catch (error) {
        console.error("에러 확인:", error);
      }
    } else {
      alert("토큰 에러");
    }
  };

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
            value={message} // 입력 상태와 바인딩
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="thanks-btn" onClick={submitThanks}>
          보내기
        </div>
      </div>
    </div>
  );
};
export default Thanks;
