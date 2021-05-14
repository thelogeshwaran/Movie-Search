import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
// import movie from "../../Axios/axios";
import axios from "axios"
import { API_KEY } from "../../Requests/requests";
import MovieCard from '../../MovieCard/MovieCard';
import "./SearchPage.css";
import {useMovieProvider} from "../../Context/MovieProvider";

function SearchPage() {
    const {query} = useParams();
    const[searchMovies, setSearchMovies]= useState([]);
    const {setSearchOpen}= useMovieProvider();
    console.log(query)
    const search_api = "https://api.themoviedb.org/3/search/";

    useEffect(()=>{
        
        async function fetchData(){
            const response =await axios.get(`${search_api}movie?api_key=${API_KEY}&query=${query}`);
            setSearchMovies(response.data.results)
        }
        if(query){
            console.log("come")
            fetchData();
        }
        setSearchOpen(true)
        return(()=>{
            setSearchOpen(false)
        })
    },[query])


    return (
        <div className="search__list">
            {
                searchMovies.length>0 ?
                 searchMovies.map((movie)=>(
                    <MovieCard movie={movie}/>
                    
                ))
                :
                    <div className="search__message">
                       <h2>There is no movies for your search .. </h2>
                    </div>
            }
        </div>
    )
}

export default SearchPage
