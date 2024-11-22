import { useEffect, useState, React } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import DonateSuccessImg from "../../assets/img/Order/donate-success.png";
import RecoBox from "../../components/Order/RecoBox";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DonateFinish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.store);
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log("here");
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);
      setToken(parsedData["user-token"]);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log(token);
      const fetchStore = () => {
        fetch(`https://api.mymoo.site/api/v1/donations/stores/5`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            point: 20000, // JSON.stringify로 바꿔야 함
          }),
        })
          .then((response) => {
            console.log("Response status:", response.status);
          })
          .then((data) => {
            console.log("Fetched data:", data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      fetchStore();
    }
    // 가게 정보
  }, [token]);
  return (
    <div className="orderfinish-page">
      <OrderNavbar text={"주문완료"} />
      <div className="orderfinish-top">
        <div className="success-img">
          <img src={DonateSuccessImg} alt="img" className="img-width" />
        </div>

        <div className="btn-area">
          <div className="thanks-btn" onClick={() => navigate("/")}>
            홈으로
          </div>
          <div className="orderlist-btn">후원 내역 보기</div>
        </div>
        <div className="orderfinish-detail">
          <div className="detail-txt">
            <span>사용처</span>
            <span className="grey">{location.state.store}</span>
          </div>
          <div className="detail-txt">
            <span>금액권 후원자</span>
            <span className="grey">이*림</span>
          </div>
          <div className="detail-txt">
            <span className="medium">결제금액</span>
            <span className="black bolder">
              {location.state.selectedPrice}원
            </span>
          </div>
        </div>
      </div>
      <div className="orderfinish-bottom">
        <div className="reco-title">미르미님이 좋아할 만한 다른 식당</div>
        <div className="reco-area">
          <RecoBox />
          <RecoBox />
          <RecoBox />
        </div>
      </div>
    </div>
  );
};
export default DonateFinish;
