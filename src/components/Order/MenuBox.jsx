import React from "react";
import ReviewIcon from "../../assets/img/Order/review.png";
import { useNavigate } from "react-router-dom";

const MenuBox = ({ menu, price, img, des }) => {
  const navigate = useNavigate();
  const GoOrderMenu = () => {
    navigate(`/order/${menu}`);
  };
  const formattedPrice = price.toLocaleString();

  return (
    <div>
      <div className="flex-row menu-box" onClick={GoOrderMenu}>
        <div className="menu-img">
          <img src={img} className="img-width" alt="food-img" />
        </div>
        <div className="menu-detail flex-col">
          <div className="menu-name">{menu}</div>
          <div className="menu-subtxt">{des}</div>
          <div className="menu-price">{formattedPrice}원</div>
          <div className="menu-review">
            <img src={ReviewIcon} alt="icon" className="icon-img" />
            <span>리뷰쓰기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
