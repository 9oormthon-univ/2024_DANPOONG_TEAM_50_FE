import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
const QrZone = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="QrZone-page">
      <div className="QrZone-box">
        <div className="Qr-zone">
          <QRCodeCanvas
            className="Qr-img"
            onClick={() => navigate("/finish")}
            value={"주문 완료!"}
          />
        </div>
        <div className="timer-zone">02:29</div>
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
