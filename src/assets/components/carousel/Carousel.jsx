import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import Img from "../../../LazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import "./style.scss";

const Carousel = ({ data, loading ,endPoint}) => {
  console.log(endPoint)
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const carouselContainer = useRef();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

        console.log(scrollAmount)
        container.scrollTo({
         left:scrollAmount,
         behavior:"smooth"
        })
  };

  const sketItem = () => {
    return (
      <div className="SkeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((items) => {
              const posterUrl = items.poster_path
                ? url.poster + items.poster_path
                : PosterFallback;
              console.log(posterUrl);
              console;
              return (
                <div key={items.id} className="carouselItem" onClick={()=>navigate(`/${items.media_type || endPoint}/${items.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={items.vote_average.toFixed(1)} />
                    <Genres data={items.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{items.title || items.name}</span>
                    <span className="date">
                      {dayjs(items.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {sketItem()}
            {sketItem()}
            {sketItem()}
            {sketItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
