import React from "react";
import Price1 from "../../assets/img/Order/price/1.png";
import Price2 from "../../assets/img/Order/price/2.png";
import Price3 from "../../assets/img/Order/price/3.png";

import On from "../../assets/img/Order/check/on.png";
import Off from "../../assets/img/Order/check/off.png";

const DonateBox = ({ price, isChecked, onSelect }) => {
  let priceImg;
  if (price <= 10000) {
    priceImg = Price1;
  } else if (price >= 11000 && price <= 20000) {
    priceImg = Price2;
  } else if (price >= 21000) {
    priceImg = Price3;
  } else {
    priceImg = Price3;
  }

  const formattedPrice = price.toLocaleString();

  return (
    <div className="donate-price-box" onClick={onSelect}>
      <div className="donate-price-img">
        <img src={priceImg} alt="img" className="img-width" />
      </div>
      <div className="donate-price-detail">
        <div className="yellow">{formattedPrice}원권</div>
      </div>
      <div className="donate-checkbox">
        {isChecked ? (
          <img src={On} alt="img" className="img-width on-img" />
        ) : (
          <img src={Off} alt="img" className="img-width off-img" />
        )}
      </div>
    </div>
  );
};

export default DonateBox;
