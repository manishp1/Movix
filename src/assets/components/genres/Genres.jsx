import React from "react";
import { useSelector } from "react-redux";
import './style.scss';

const Genres = ({data}) =>{
    const {genres} = useSelector((state)=>state.home)

    return (
        <div className="genres">
            {
               
                data?.map((items)=>{
                    if(!genres[items]?.name)return;
                    return ( <div key={items.id} className="genre">
                    {genres[items]?.name}
                </div>)
                   
                })
            }
        </div>
    )
}

export default Genres