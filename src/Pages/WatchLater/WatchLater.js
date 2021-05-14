import React, { useState, useEffect } from 'react';
import "./WatchLater.css";
import {useParams} from "react-router-dom";
import { db } from "../../Firebase/firebase";
import MovieCard from "../../MovieCard/MovieCard";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';



function WatchLater() {
    const {userId} = useParams();
    const [ movies,setMovies]= useState([]);
    

    useEffect(() => {
        db.collection("users")
        .doc(userId)
        .collection("watchlater")
        .onSnapshot((snap) => {
          setMovies(snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })))
          
        });
       
    }, [])

    const removeLike = (id)=>{
        db.collection("users")
        .doc(userId)
        .collection('watchlater')
        .doc(id)
        .delete()
    }
    // console.log(movies)
    return (
        <div className="liked">
            <div>
                <h1>WatchList</h1>
            </div>
            <div className="liked__list">
            {
                movies.length>0 ? movies.map((movie)=> (
                    <div>
                        <MovieCard key={movie.data.id}movie={movie.data.data}/>
                        <div><IconButton style={{backgroundColor:"#1F2937", color:"white", marginRight:"10px" }} onClick={()=>removeLike(movie.id)}><ClearIcon/></IconButton>Remove</div>
                    </div>
                ))
                :
                <div className="list__info">  
                    <h2>You haven't added any Movies...</h2>
                </div>
            }
            </div>
        </div>
    )
}

export default WatchLater