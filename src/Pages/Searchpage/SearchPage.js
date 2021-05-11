import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import movie from "../../Axios/axios";
import { API_KEY } from "../../Requests/requests";
import MovieCard from '../../MovieCard/MovieCard';
import "./SearchPage.css";

function SearchPage() {
    const {query} = useParams();
    const[searchMovies, setSearchMovies]= useState([]);
    // console.log(query);

    const search_api = "https://api.themoviedb.org/3/search/"
    useEffect(()=>{
        
        async function fetchData(){
            const response =await movie.get(`${search_api}movie?api_key=${API_KEY}&query=${query}`);
            // console.log(response.data.results);
            setSearchMovies(response.data.results)
        }
        if(query){
            console.log("come")
            fetchData();
        }
    },[query])
    return (
        <div className="search__list">
            {
                searchMovies && searchMovies.map((movie)=>(
                    <MovieCard movie={movie}/>
                ))
            }
        </div>
    )
}

export default SearchPage
