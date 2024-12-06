import { React, useState } from "react";
import QrScanner from "react-qr-scanner";
import Frame from "../../assets/img/Order/frame.png";
import { useNavigate } from "react-router-dom";
const QrScan = () => {
  const navigate = useNavigate();

  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = (scanData) => {
    if (scanData) {
      const scannedObject = JSON.parse(scanData.text);

      console.log(
        `Loaded >>>`,
        scannedObject,
        scannedObject.dId,
        scannedObject.childId
      );
      setData(scanData.text);
      setStartScan(false);
      setLoadingScan(false);
      console.log(data.dId, data.childId);
      navigate("/shop/finish", {
        state: {
          place: scannedObject.place,
          donator: scannedObject.donator,
          price: scannedObject.price,
          dId: scannedObject.dId,
          childId: scannedObject.childId,
        },
      });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div>
      <div className="qr-scan-page">
        <div className="qr-scan-area-bg"></div>
        <div className="qr-scan-area-main">
          <button
            onClick={() => {
              setStartScan(!startScan);
              setData(""); // Reset scanned data on new scan start
            }}
          >
            {startScan ? "인식 중단" : "결제하기"}
          </button>

          <div className="qr-scan-area">
            <div className="frame-img">
              <img src={Frame} alt="img" className="img-width" />
            </div>
            <QrScanner
              delay={500}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
              constraints={{
                video: {
                  facingMode: "environment",
                },
              }}
            />
          </div>
          <div className="notice-txt">QR 코드를 스캔하세요.</div>
          {loadingScan && <p>Loading...</p>}
          {data !== "" && <p>인식결과: {data}</p>}
        </div>
      </div>
    </div>
  );
};

export default QrScan;
