import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import homeOnIcon from '../../assets/img/Nav/home=on.svg';
import homeOffIcon from '../../assets/img/Nav/home=off.svg';
import mapOnIcon from '../../assets/img/Nav/map=on.svg';
import mapOffIcon from '../../assets/img/Nav/map=off.svg';
import heartOnIcon from '../../assets/img/Nav/heart=on.svg';
import heartOffIcon from '../../assets/img/Nav/heart=off.svg';
import myOnIcon from '../../assets/img/Nav/my=on.svg';
import myOffIcon from '../../assets/img/Nav/my=off.svg';

const getNavItems = (role) => {
  switch (role) {
    case "CHILD":
      return [
        { path: "/Main", onIcon: homeOnIcon, offIcon: homeOffIcon, alt: "홈" },
        { path: "/map", onIcon: mapOnIcon, offIcon: mapOffIcon, alt: "지도" },
        { path: "/heart", onIcon: heartOnIcon, offIcon: heartOffIcon, alt: "찜" },
        { path: "/my", onIcon: myOnIcon, offIcon: myOffIcon, alt: "마이페이지" },
      ];
    case "STORE":
      return [
        { path: "/Shop", onIcon: homeOnIcon, offIcon: homeOffIcon, alt: "샵" },
        { path: "/map", onIcon: mapOnIcon, offIcon: mapOffIcon, alt: "지도" },
        { path: "/heart", onIcon: heartOnIcon, offIcon: heartOffIcon, alt: "찜" },
        { path: "/my", onIcon: myOnIcon, offIcon: myOffIcon, alt: "마이페이지" },
      ];
    case "DONATOR":
      return [
        { path: "/Main2", onIcon: homeOnIcon, offIcon: homeOffIcon, alt: "홈2" },
        { path: "/map", onIcon: mapOnIcon, offIcon: mapOffIcon, alt: "지도" },
        { path: "/heart", onIcon: heartOnIcon, offIcon: heartOffIcon, alt: "찜" },
        { path: "/my", onIcon: myOnIcon, offIcon: myOffIcon, alt: "마이페이지" },
      ];
    default:
      return [
        { path: "/", onIcon: homeOnIcon, offIcon: homeOffIcon, alt: "홈" },
        { path: "/map", onIcon: mapOnIcon, offIcon: mapOffIcon, alt: "지도" },
        { path: "/heart", onIcon: heartOnIcon, offIcon: heartOffIcon, alt: "찜" },
        { path: "/my", onIcon: myOnIcon, offIcon: myOffIcon, alt: "마이페이지" },
      ];
  }
};

const NavBar = () => {

  const location = useLocation();

  // 숨기고 싶은 경로들
  const hiddenPaths = ["/signin", "/signup", "/signupchild", "/signupadult"];

  // 현재 경로가 hiddenPaths에 포함되어 있으면 null 반환
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }
  
  // 로컬 스토리지에서 mymoo 데이터 가져오기
  const mymooData = localStorage.getItem('mymoo');
  let role = null;

  // 데이터 파싱 및 role 추출
  if (mymooData) {
    try {
      const parsedData = JSON.parse(mymooData);
      role = parsedData.role; // role 값 추출
      console.log('Role from parsed mymooData:', role); // 디버깅용 로그
    } catch (error) {
      console.error('Failed to parse mymoo data:', error);
    }
  } else {
    console.warn('mymoo data not found in localStorage');
  }

  const navItems = getNavItems(role);

  return (
    <div className="navbar">
      {navItems.map(({ path, onIcon, offIcon, alt }) => (
        <NavLink key={path} to={path} className={({ isActive }) => (isActive ? "active" : "")}>
          {({ isActive }) => (
            <img src={isActive ? onIcon : offIcon} alt={alt} />
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
