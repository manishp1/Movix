import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3";

export const API_KEY = "?api_key=627cf6f580b7818fb39e05a68b332e0d" 


export const  fetchApiFromURL = async (url) => {
    
  try {
    const { data } = await axios.get(BASE_URL + url + API_KEY);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
