import { React, useState } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import MenuBox from "../../components/Order/MenuBox";
import { useNavigate } from "react-router-dom";
const OrderMenu = () => {
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(0);
  const cntUp = () => {
    setCnt(cnt + 1);
  };
  const cntDown = () => {
    setCnt(cnt - 1);
    if (cnt <= 0) {
      setCnt(0);
    }
  };
  return (
    <div className="ordermenu-page">
      <OrderNavbar text="떠밥 강남점" />
      <div className="ordermenu-top">
        <div className="ordermenu-img">
          <img
            className="img-width"
            src="https://recipe1.ezmember.co.kr/cache/recipe/2019/01/05/8cf7a3c0e113de435fa189b1d3e6984c1.jpg"
            alt="shop-top-img"
          />
        </div>
        <div className="ordermenu-info flex-col">
          <div className="menu-title">스팸마요 덮밥</div>
          <div className="detail-txt">
            일일 수량 한정♥ 셰프가 직접 매일 요리하는 정성가득 스팸마요덮밥
          </div>
          <div className="ordermenu-detail">
            <div className="price">10000원</div>
            <div className="counter">
              <div className="minus" onClick={cntDown}>
                -
              </div>
              <div className="cnt">{cnt}</div>
              <div className="plus" onClick={cntUp}>
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ordermenu-bottom">
        <div className="add-menu">추가 메뉴</div>
        <MenuBox
          key={-1}
          menu="음료수"
          price={2000}
          img={
            "https://i.namu.wiki/i/UUUicJzYIISF6z27yGzgl6c-2vdffpFx0fPSI1gWx00LShUqTOUd5z9mYqPsmO-o8NM5ED6tOVwIa4Jz7NIJ4Q.webp"
          }
          des={"시원한 음료수"}
        />
        <MenuBox
          key={0}
          menu="단무지"
          price={1000}
          img={"https://ppss.kr/wp-content/uploads/2016/07/0-540x360.jpg"}
          des={"시원한 단무지"}
        />
      </div>
      <div className="ordermenu-pay-area">
        <div className="pay-area-detail">
          <div className="price">10000원</div>
          <div className="txt">주문 시 잔액 25000원</div>
        </div>
        <div className="order-btn" onClick={alert("금액권을 이용해주세요")}>
          주문하기
        </div>
      </div>
    </div>
  );
};
export default OrderMenu;
