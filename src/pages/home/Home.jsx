import React from "react";
import Header from "../../assets/components/header/Header";
import Footer from "../../assets/components/footer/Footer";
import HeroBanner from './heroBanner/HeroBanner'
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
TopRated

import './style.scss'
import TopRated from "./topRated/TopRated";

 const Home = () =>{
    return (
        <div className="heroBanner">
            <Header></Header>
            <HeroBanner></HeroBanner>
            <Trending />
            <Popular />
            <TopRated />
            <Footer/>
           
        </div>
    )
 }

 export default Home