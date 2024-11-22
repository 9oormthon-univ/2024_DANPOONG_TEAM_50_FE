import { React, useEffect } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import ShopSuccessImg from "../../assets/img/Order/shop-success.png";
import RecoBox from "../../components/Order/RecoBox";
import { useLocation } from "react-router-dom";
const ShopFinish = () => {
  const location = useLocation();
  console.log(location.state.scannedData);
  const token = `eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MzIyMTAwMzksImV4cCI6MTczMjIxMTgzOSwidXNlcklkIjoyLCJhdXRoIjoiRE9OQVRPUiJ9.ctkUKNSGCjqK37wNZIpcQ2S8593M3BEJqlbGgXTWkVtTxpqKDkCAk-TpvCAmv6cVJz7cQU_bV1lQmRceEdxUiw`;
  // 가게 정보
  const fetchScan = () => {
    fetch(`https://api.mymoo.site/api/v1/donation-usages`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        donationId: 0,
        childId: 0,
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchScan();
  }, []); // 빈 배열([])로 설정해 컴포넌트가 마운트될 때 한 번만 실행

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
            <span className="grey">한솥도시락 신설동역점</span>
          </div>
          <div className="detail-txt">
            <span>금액권 후원자</span>
            <span className="grey">이*림</span>
          </div>
          <div className="detail-txt">
            <span className="medium">결제금액</span>
            <span className="black bolder">12,000원</span>
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
export default ShopFinish;
