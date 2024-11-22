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
        <MenuBox menu="(BEST) 동파육 덮밥" price="12,000원" />
        <MenuBox menu="(BEST) 갈비 덮밥" price="11,000원" />
        <MenuBox menu="마파두부 덮밥" price="11,000원" />
      </div>
      <div className="ordermenu-pay-area">
        <div className="pay-area-detail">
          <div className="price">10000원</div>
          <div className="txt">주문 시 잔액 25000원</div>
        </div>
        <div className="order-btn" onClick={() => navigate("/pay")}>
          주문하기
        </div>
      </div>
    </div>
  );
};
export default OrderMenu;
