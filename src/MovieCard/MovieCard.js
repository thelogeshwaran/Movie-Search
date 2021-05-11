import React from 'react'
import "./MovieCard.css"
import TextTruncate from 'react-text-truncate';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { motion } from "framer-motion";



function MovieCard({movie}) {

    const image_api ="https://image.tmdb.org/t/p/original/"
    return (
        <div className="moviecard">
                <motion.img initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1}} src={`${image_api}${movie.backdrop_path || movie.poster__path}`} alt="movie poster"></motion.img>    
               <TextTruncate
               line={1}
               element="p"
               truncateText="..."
               text={movie.overview}/>
                <h3>{movie.title || movie.original_name}</h3>
                
                <div className="moviecard__about">
                <div>
                {movie.release_date || movie.first_air_date}
                </div>
                <div className="moviecard__likes">
                <ThumbUpAltIcon/>
                { movie.vote_count}
                </div>
                </div>
                
        </div>
    )
}

export default MovieCard
