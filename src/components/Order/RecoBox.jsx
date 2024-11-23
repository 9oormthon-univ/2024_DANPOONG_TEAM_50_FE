import React from "react";

const RecoBox = (store, text, img) => {
  return (
    <div className="reco-restaurant">
      <div className="reco-img">
        <img src={img} alt="img" className="img-width" />
      </div>
      <span className="reco-res-title">{store}</span>
      <span className="grey">{text}</span>
    </div>
  );
};
export default RecoBox;
