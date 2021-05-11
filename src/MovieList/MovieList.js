import React,{ useEffect, useState } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css"
import movie from "../Axios/axios";

function MovieList({selectedOption}) {

    const [movies, setMovies] = useState([]);


    useEffect(()=>{
        async function fetchData(){
            const response = await movie.get(selectedOption);
            setMovies(response.data.results);
            console.log(response.data.results)
        }

        fetchData();
    },[selectedOption])
    return (
        <div className="movie__list">
            {
                movies.map && movies.map((movie)=>(
                    <MovieCard key={movie.id}movie={movie}/>
                ))
            }
            
        </div>
    )
}

export default MovieList
