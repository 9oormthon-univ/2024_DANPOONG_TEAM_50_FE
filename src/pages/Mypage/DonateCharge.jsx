import React, { useState, useEffect } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserInfoAPI } from "../../apis/user.jsx";
const DonateCharge = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(); // 사용자 정보 상태 관리
  const [chargeData, setChargeData] = useState(null);
  // 입력값 포맷팅
  const handleInputChange = (e) => {
    let value = e.target.value.replace(/,/g, ""); // 기존 콤마 제거
    if (!isNaN(value)) {
      // 숫자만 입력되도록
      setAmount(Number(value).toLocaleString()); // 숫자 포맷팅
    }
  };

  // 충전 버튼
  const handleChargeClick = () => {
    const numericAmount = parseInt(amount.replace(/,/g, ""), 10); // 콤마 제거 후 숫자로 변환
    if (numericAmount < 1000 || isNaN(numericAmount)) {
      alert("충전 금액은 1000원 이상이어야 합니다.");
      return;
    }
    alert(`충전 금액: ${numericAmount}원`);
    console.log(token, "dma?");
    goCharge();
  };
  const fetchUserInfo = async () => {
    try {
      const responseData = await getUserInfoAPI(); // 사용자 정보 API 호출
      setUser({
        accountId: responseData.accountId,
        email: responseData.email,
        phone_number: responseData.phone_number,
        nickname: responseData.nickname,
        point: responseData.point,
        profileImageUrl: responseData.profileImageUrl,
        userRole: responseData.role,
      });
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    }
  };
  // 카카오페이 로직
  useEffect(() => {
    // Recoil 상태에 토큰이 없는 경우 로컬 스토리지에서 가져옴
    if (!token) {
      const storedData = localStorage.getItem("mymoo");
      if (storedData) {
        const { "user-token": storedToken } = JSON.parse(storedData);
        if (storedToken) {
          setToken(storedToken); // Recoil 상태에 토큰 저장
        } else {
          console.error("로컬 스토리지에 JWT 토큰이 없습니다.");
        }
      } else {
        console.error("로컬 스토리지에 데이터가 없습니다.");
      }
    } else {
      // 토큰이 존재하면 사용자 정보 가져오기
      fetchUserInfo();
    }
  }, [token, setToken]);

  const goCharge = async () => {
    if (token) {
      try {
        const response = await axios.post(
          "https://api.mymoo.site/api/v1/payment/ready",
          {
            name: user.nickname,
            totalPrice: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChargeData(response.data);
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    }
  };
  useEffect(() => {
    console.log("ddd", chargeData);
    if (chargeData !== null && chargeData.tid) {
      localStorage.setItem("tid", chargeData.tid);
      console.log(chargeData.tid, "dd");
      window.location.href = chargeData.next_redirect_pc_url;
    } else {
      console.log("chargeData is not ready", chargeData);
    }
  }, [chargeData]);
  return (
    <div className="donatecharge-page">
      <OrderNavbar text="충전하기" />
      <div className="donatecharge-main">
        <div className="charge-title">얼마를 충전할까요?</div>

        <input
          className="charge-input"
          placeholder="충전 금액을 입력하세요"
          value={amount}
          onChange={handleInputChange}
        />
        <div className="charge-btn-area">
          <div className="charge-btn" onClick={handleChargeClick}>
            충전하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateCharge;
