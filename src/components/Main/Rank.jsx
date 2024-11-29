import React from "react";

const Rank = ({ topRankers }) => {
  return (
    <div className="rank-container">
      <ul className="rank-list">
        {topRankers.slice(0, 4).map((ranker, index) => ( 
          <li key={index} className="rank-item">
            <div className="rank-left">
              <span className="rank-number">{index + 1}</span>
              <img
                src={ranker.avatar}
                alt={`${ranker.name} 프로필`}
                className="rank-avatar"
              />
              <div className="rank-info">
                <p className="rank-name">
                  {ranker.name}
                  <span className="rank-gender">
                    {" "}
                  </span>
                </p>
                <p className="rank-date">최근 후원 날짜 {ranker.lastDonationDate}</p>
              </div>
            </div>
            <div className="rank-right">
              <p className="rank-amount">누적 후원금액</p>
              <p className="rank-total">
                {Number(ranker.donationAmount || 0).toLocaleString()}원
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rank;
