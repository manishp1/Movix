import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../movix-logo.svg";

import "./style.scss";

import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(()=>{
    window.scrollTo(0 ,0)
  },[location])

  const controlNavigation = () =>{
    
    if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
            setShow("hide")
        }else {
            setShow("show")
        }
    }else {
        setShow("top")
    }
    setLastScrollY(window.screenY)
  }

  useEffect(()=>{
    window.addEventListener("scroll" , controlNavigation)
    return ()=> window.removeEventListener("scroll" , controlNavigation)
  },[lastScrollY])

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileView = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const fetchQuery = (e) => {
    setQuery(e.target.value);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(()=>{
        setShowSearch(false);
      },1000)
    }
  };

  const MenuHandler = (type) =>{
        if(type === "movie"){
            navigate("/explore/movie")
        }else{
            navigate("/explore/tv")
        }
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="movix logo"></img>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>MenuHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>MenuHandler("tv")}>TV Shows</li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? (
            <VscChromeClose onClick={()=>setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileView} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
            <input
              onKeyUp={searchQueryHandler}
              onChange={fetchQuery}
              type="text"
              placeholder="Search for movie and tv show..."
            />
            <VscChromeClose onClick={()=>setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
      
    </header>
  );
};

export default Header;
