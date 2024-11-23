import React from "react";

const Donation = ({ user }) => {
  return (
    <div className="donation">
      <div className="user-info">
        <div className="user-details">
          <h3>
            {user.name} {user.birthYear} / {user.gender}
          </h3>
          <p>최근 후원 날짜: {user.lastDonationDate}</p>
        </div>
        <div className="user-avatar">
          <img src={user.profileImg} className="profile-img" />
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
