import React from "react";

const Donation = ({ user }) => {
  if (!user) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="donation">
      <div className="user-info">
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>최근 후원 날짜: </p>
          <p>{user.lastDonationDate}</p>
        </div>
        <div className="user-avatar">
          <img src={user.profileImg} alt="프로필 이미지" className="profile-img" />
        </div>
        <div className="user-stats">
          <p>
            현재 등수: <span className="highlight-yellow">{user.rank}등</span>
          </p>
          <p>
            누적 후원금액: <span>{user.donationAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
