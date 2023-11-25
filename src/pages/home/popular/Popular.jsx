import React, {useState} from "react";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../assets/components/switchtabs/switchTabs";
import FetchApi from "../../../hooks/FetchApi";
import Carousel from "../../../assets/components/carousel/Carousel";



const Popular = () => {    
    const [endPoint, setEndPoint] = useState("movie")
    const {data , loading} = FetchApi(`/${endPoint}/popular`)
    console.log(data)
  const onTabChange = (tab) => {
    setEndPoint(tab == "Movies" ? "movie" : "tv")
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Showes"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data = {data?.results} loading= {loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
