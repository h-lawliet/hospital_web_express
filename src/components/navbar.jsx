import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  StyledHamburger, 
  StyledNavbar, 
  StyledOverlay, 
  StyledSidebar,
  Item,
  SubMenuContainer,
  SubMenuItem,
  SidebarArrow
} from "./navbarStyles.jsx";
import { navList } from "../data/navlist.js";

// SidebarItem 컴포넌트는 부모에서 전달받은 openSubMenu 상태를 사용합니다.
const SidebarItem = ({ item, index, openSubMenu, setOpenSubMenu }) => {
  const isSubOpen = openSubMenu === index;

  const handleClick = () => {
    // 같은 메뉴를 클릭하면 닫고, 다른 메뉴 클릭 시 해당 메뉴만 열림
    setOpenSubMenu(isSubOpen ? null : index);
  };

  return (
    <>
      <Item onClick={handleClick} isSubOpen={isSubOpen}>
        {item.detail.length !== 1 ? (
          <>
            {item.name}
            <SidebarArrow isSubOpen={isSubOpen} />
          </>
        ) : (
          <a
            href={item.link}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            {item.name}
          </a>
        )}
      </Item>
      {item.detail.length !== 1 && (
        <SubMenuContainer isSubOpen={isSubOpen}>
          {item.detail.map((subItem, subIndex) => (
            <SubMenuItem key={subIndex}>
              <a
                href={item.link + "/" + subIndex}
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                {subItem}    
              </a>
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      )}
    </>
  );
};

const Navbar = () => {
  const [isSmall, setIsSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // openSubMenu 상태를 통해 현재 열려있는 메뉴의 인덱스를 관리합니다.
  const [openSubMenu, setOpenSubMenu] = useState(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // 사이드바가 닫힐 때 열린 드롭다운도 초기화
    if (isOpen) setOpenSubMenu(null);
  };

  const handleResize = () => {
    setIsSmall(window.innerWidth <= 1200);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmall ? (
        <>
          <StyledNavbar>
            <div className="navbar-logo">
              <a
                href="/"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/logo_main_pc.png"
                  style={{ height: "50%", width: "auto" }}
                  alt="logo"
                />
              </a>
            </div>
          </StyledNavbar>
          <StyledHamburger onClick={toggleMenu} isOpen={isOpen}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </StyledHamburger>
          <StyledOverlay isOpen={isOpen} onClick={toggleMenu} />
          <StyledSidebar isOpen={isOpen}>
            <div
              style={{
                position: "fixed",
                top: 0,
                height: "110px",
                width: "250px",
                backgroundColor: "white",
                zIndex: 100,
              }}
            />
            <div style={{ overflowY: "auto", marginTop: "110px" }}>
              {navList.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  index={index}
                  openSubMenu={openSubMenu}
                  setOpenSubMenu={setOpenSubMenu}
                />
              ))}
            </div>
          </StyledSidebar>
        </>
      ) : (
        <StyledNavbar>
          <div className="navbar-logo">
            <a
              href="/"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/logo_main_pc.png"
                style={{ height: "50%", width: "auto" }}
                alt="logo"
              />
            </a>
          </div>
          <ul className="navbar-menu">
            {navList.map((element, i) => (
              <li className="navbar-item" key={i}>
                <Link to={element.detail.length === 1 ? element.link : element.link + "/0"} onClick>
                  {element.name}
                </Link>
                {element.detail.length !== 1 && (
                  <ul className="dropdown-menu">
                    {element.detail.map((e, index) => (
                      <li key={`list ${index}`}>
                        <Link className="navbar-link" to={element.link + "/" + index} onClick>
                          {e}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </StyledNavbar>
      )}
    </>
  );
};

export default Navbar;