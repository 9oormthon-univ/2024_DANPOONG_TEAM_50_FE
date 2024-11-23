import { React, useEffect, useState } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import ShopSuccessImg from "../../assets/img/Order/shop-success.png";
import RecoBox from "../../components/Order/RecoBox";
import { useLocation } from "react-router-dom";
const ShopFinish = () => {
  const location = useLocation();
  const [token, setToken] = useState(0);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    console.log(location.state.dId); // 정상적으로 출력되어야 합니다.

    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserRole(parsedData.role);
      setToken(parsedData["user-token"]);
    }
  }, [location]);

  // 가게 정보
  const fetchScan = () => {
    if (token !== 0) {
      fetch(`https://api.mymoo.site/api/v1/donation-usages`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donationId: location.state.dId,
          childAccountId: location.state.childId,
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
    }
  };
  useEffect(() => {
    fetchScan();
  }, [token]); // 빈 배열([])로 설정해 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="orderfinish-page">
      <OrderNavbar text={"주문완료"} />
      <div className="orderfinish-top">
        <div className="success-img">
          <img src={ShopSuccessImg} alt="img" className="img-width" />
        </div>

        <div className="btn-area">
          <div className="thanks-btn">홈으로</div>
          <div className="orderlist-btn">후원 내역 보기</div>
        </div>
        <div className="orderfinish-detail">
          <div className="detail-txt">
            <span>사용처</span>
            <span className="grey">{location.state.place}</span>
          </div>
          <div className="detail-txt">
            <span>금액권 후원자</span>
            <span className="grey">{location.state.donator}</span>
          </div>
          <div className="detail-txt">
            <span className="medium">결제금액</span>
            <span className="black bolder">{location.state.price}원</span>
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
export default ShopFinish;
