import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios, { all } from "axios";
import { fetchApiFromURL } from "./utils/api";
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import { getApiConfigiration, getGenres } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const fetchApiConfig = () => {
    fetchApiFromURL("/configuration")
      .then((response) => {
        const url = {
          backdrop: response.images.secure_base_url + "original",
          poster: response.images.secure_base_url + "original",
          profile: response.images.secure_base_url + "original",
        };
        dispatch(getApiConfigiration(url));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchGeneres = async () => {
    const promises = [];
    const endpoints = ["tv", "movie"];
    let allGeneres = {};

    endpoints.forEach((url) => {
      return promises.push(fetchApiFromURL(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGeneres[item.id] = item));
    });

    dispatch(getGenres(allGeneres));
  };

  useEffect(() => {
    fetchApiConfig();
    fetchGeneres();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Detail />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
