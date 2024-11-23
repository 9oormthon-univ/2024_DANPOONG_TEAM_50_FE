import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const QrZone = ({ onClose, place, price, donator }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(7); // 초기 시간 10초

  useEffect(() => {
    if (timeLeft === 0) {
      onClose(); // 시간이 0이 되면 onClose 실행
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); // 1초씩 감소
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [timeLeft, onClose]);

  // 분과 초 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="QrZone-page">
      <div className="QrZone-box">
        <div className="Qr-zone">
          <QRCodeCanvas
            className="Qr-img"
            onClick={() => navigate("/finish")}
            value={(place, price, donator)}
          />
        </div>
        <div className="timer-zone">{formatTime(timeLeft)}</div>
        <div className="notice-txt">화면 밝기를 최대로 올려주세요.</div>
        <div className="btn-area">
          <div className="QR-btn close-btn" onClick={onClose}>
            닫기
          </div>
          <div
            className="QR-btn ok-btn"
            onClick={() => {
              navigate("/finish");
            }}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrZone;
