import React from "react";
import FetchApi from '../../hooks/FetchApi'
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Header from "../../assets/components/header/Header";
import Footer from "../../assets/components/footer/Footer";
import { useParams } from "react-router-dom";
import Cast from "../../assets/components/cast/cast";



const Detail = () =>{
    const {mediaType , id} = useParams()
    const { data, loading } = FetchApi(`/${mediaType}/${id}/videos`);
    const { data:credits, loading: creditsLoading } = FetchApi(`/${mediaType}/${id}/credits`);
    return (
        <div>
            <Header />
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
            <Cast data={credits?.cast} loading={creditsLoading}/>
            <Footer />
        </div>
    )
}

export default Detail