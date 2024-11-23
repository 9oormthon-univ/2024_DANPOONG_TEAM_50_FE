import { useEffect, useState, React } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import DonateSuccessImg from "../../assets/img/Order/donate-success.png";
import RecoBox from "../../components/Order/RecoBox";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DonateFinish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const price = location.state.selectedPrice;
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
        fetch(
          `https://api.mymoo.site/api/v1/donations/stores/${location.state.storeId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              point: price, // JSON.stringify로 바꿔야 함
            }),
          }
        )
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
          <div className="thanks-btn" onClick={() => navigate("/main2")}>
            홈으로
          </div>
          <div className="orderlist-btn"  onClick={() => navigate("/my/donatelist")}>후원 내역 보기</div>
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
 <RecoBox
            store={"미도인 강남점"}
            text={"그 유명한 스테이크 웨이팅 덮밥집"}
            img={
              "https://lh6.googleusercontent.com/proxy/MBuStOETfZGnRi2S3hXXyY-GJ_6zf0KqHMmVMX1OoZ1NT2jIgTaF2n6NkWWmu_-EAYBVl67rd_C_3FluI-8VPymNEBQejR0jf43i5lVoRXqJKLVjCPLJyEl-0ZHTpyEpyrE_IyUdtES8KjXl12FKbYTb7Nvod0FIaUjX9hmB0H8Rzl3m4RM"
            }
          />
          <RecoBox
            store={"은행골 홍대점"}
            text={"가성비 스시가 먹고싶다면?"}
            img={
              "https://mblogthumb-phinf.pstatic.net/MjAxODA4MDZfNTIg/MDAxNTMzNTU3MTU3Mzg4.L8QJ9K-PcEgQMPJbifTvaYTE79ZBKgMLBUJ5OW9vfgAg.8psvAjo9rMttO4ZfZAHNWqyHtVhz-FWQ1t-O6DKpXuAg.JPEG.jm_park97/IMG_1273.jpg?type=w800"
            }
          />
          <RecoBox
            store={"정돈 혜화점"}
            text={"정석적인 돈카츠, SNS에서 핫한 그 맛집"}
            img={
              "https://d12zq4w4guyljn.cloudfront.net/750_750_20240722125146_photo1_edaface0d64a.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
};
export default DonateFinish;
