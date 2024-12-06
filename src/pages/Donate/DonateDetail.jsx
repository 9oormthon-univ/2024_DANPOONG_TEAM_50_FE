import { React, useState, useEffect } from "react";
import NoticeImg from "../../assets/img/Order/notice.png";
import Price1 from "../../assets/img/Order/price/1.png";
import Price2 from "../../assets/img/Order/price/2.png";
import Price3 from "../../assets/img/Order/price/3.png";
import QrZone from "../../components/Order/QrZone";
import { useLocation } from "react-router-dom";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import LetterImg from "../../assets/img/thanks/letter.png";
import ProfileImg from "../../assets/img/thanks/profile.png";
const DonateDetail = () => {
  const [id, setId] = useState(0);
  const [token, setToken] = useState(0);
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  // 스토리지 끌어오기
  useEffect(() => {
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData["user-token"]);
      setId(parsedData.accountId);
      fetchData();
    }
  }, [token]);
  const fetchData = () => {
    if (token !== 0) {
      fetch(`https://api.mymoo.site/api/v1/donations/${location.state.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Response status:", response.status);
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
          setDetail(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };
  const priceImg = Price1;
  // let priceImg;
  // if (location.state.price <= 10000) {
  //   priceImg = Price1;
  // } else if (location.state.price >= 11000 && location.state.price <= 15000) {
  //   priceImg = Price2;
  // } else if (location.state.price >= 16000) {
  //   priceImg = Price3;
  // }
  // const formattedPrice = location.state.price.toLocaleString();

  return (
    <div className="donate-detail-page">
      <OrderNavbar text="후원 세부내역" />
      <div className="donate-detail-main">
        <div className="detail-top">
          <div className="store">{detail.store}</div>
          <div className="price">10,000원권</div>
          <div className="price-img">
            <img src={priceImg} alt="img" className="img-width" />
          </div>
        </div>
        <div className="donate-detail-mid">
          <div className="detail-contents">
            <div className="donate-detail">
              <div className="detail-txt">
                <span>사용처</span>
                <span className="grey">{detail.store}</span>
              </div>
              <div className="detail-txt">
                <span>후원날짜</span>
                <span className="grey">{detail.donatedAt}</span>
              </div>
            </div>
          </div>
          <div className="detail-contents">
            <div className="donate-detail">
              <div className="detail-txt">
                <span>금액권 사용자</span>
                <span className="grey">{detail.child}</span>
              </div>
              <div className="detail-txt">
                <span>사용날짜</span>
                <span className="grey">{detail.donationUsedAt}</span>
              </div>
              <div className="detail-txt">
                <span className="medium">후원금액</span>
                <span className="black bolder">{detail.point}원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="letter-zone">
          <div className="letter-title">감사편지</div>
          <div className="letter-area">
            <div className="letter-img">
              <img src={LetterImg} alt="img" className="img-width" />
            </div>
            <div className="area">
              <div className="text-box">
                <div className="profile">
                  <img src={ProfileImg} alt="img" className="profile-img" />
                  <span className="child">{detail.child}</span>
                </div>
                <div className="message">{detail.message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DonateDetail;
