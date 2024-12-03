import React, { useState } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";

const DonateCharge = () => {
  const [amount, setAmount] = useState("");

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
  };

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
