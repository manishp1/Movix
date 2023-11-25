import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchApi from "../../../hooks/FetchApi";
import { useSelector } from "react-redux";
import Img from "../../../LazyLoadImage/img";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import './hero-banner-style.scss';

const HeroBanner = () => {
  const [background, setBackGround] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, loading } = FetchApi("/movie/upcoming");
  const { url } = useSelector((state) => state.home);


  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackGround(bg);
  }, [data]);

  const fetchQuery = (e) => {
    setQuery(e.target.value);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="hero-banner">
      {!loading && (
        <div className="backdrop-image">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movie, Tv shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              onKeyUp={searchQueryHandler}
              onChange={fetchQuery}
              type="text"
              placeholder="Search for movie and tv show..."
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
