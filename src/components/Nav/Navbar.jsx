import React from "react";
import { NavLink } from "react-router-dom";

import homeOnIcon from "../../assets/img/Nav/home=on.svg";
import homeOffIcon from "../../assets/img/Nav/home=off.svg";
import mapOnIcon from "../../assets/img/Nav/map=on.svg";
import mapOffIcon from "../../assets/img/Nav/map=off.svg";
import heartOnIcon from "../../assets/img/Nav/heart=on.svg";
import heartOffIcon from "../../assets/img/Nav/heart=off.svg";
import myOnIcon from "../../assets/img/Nav/my=on.svg";
import myOffIcon from "../../assets/img/Nav/my=off.svg";

const navItems = [
  { path: "/", onIcon: homeOnIcon, offIcon: homeOffIcon, alt: "홈" },
  { path: "/map", onIcon: mapOnIcon, offIcon: mapOffIcon, alt: "지도" },
  { path: "/heart", onIcon: heartOnIcon, offIcon: heartOffIcon, alt: "찜" },
  { path: "/my", onIcon: myOnIcon, offIcon: myOffIcon, alt: "마이페이지" },
];

const NavBar = () => {
  return (
    <div className="navbar">
      {navItems.map(({ path, onIcon, offIcon, alt }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <img src={isActive ? onIcon : offIcon} alt={alt} />
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
