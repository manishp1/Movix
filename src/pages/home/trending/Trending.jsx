import React, {useState} from "react";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../assets/components/switchtabs/switchTabs";
import FetchApi from "../../../hooks/FetchApi";
import Carousel from "../../../assets/components/carousel/Carousel";



const Trending = () => {    
    const [endPoint, setEndPoint] = useState("day")
    const {data , loading} = FetchApi(`/trending/all/${endPoint}`)
  const onTabChange = (tab) => {
    console.log(tab)
    setEndPoint(tab == "Day" ? "day" : "week")
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data = {data?.results} loading= {loading} endPoint={endPoint} />
    </div>
  );
};

export default Trending;
