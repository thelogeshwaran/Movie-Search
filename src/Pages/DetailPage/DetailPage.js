import React, { useEffect,useState } from 'react'
import "./DetailPage.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Tooltip from '@material-ui/core/Tooltip';
import { API_KEY } from "../../Requests/requests";
import movie from "../../Axios/axios";
import { motion } from "framer-motion";
import {useParams} from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { useAuthProvider } from "../../Context/AuthProvider";
import { useMovieProvider } from "../../Context/MovieProvider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import firebase from "firebase"
    


function DetailPage() {
    const [data, setData]= useState("");
    const {movieId} = useParams();
    const { user } = useAuthProvider();
    const [like, setLike]= useState(false);
    const [filteredMovie, setFilteredMovie] = useState("");
    const { likedMovies,playList, setPlayList} = useMovieProvider();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen]= useState(false);
    const [name, setName]= useState("");

    
    

    const movie_api = "https://api.themoviedb.org/3/movie/";
    const image_api ="https://image.tmdb.org/t/p/original/";

    useEffect(()=>{
        async function fetchdata(){
            const response = await movie.get(`${movie_api}${movieId}?api_key=${API_KEY}`);
            setData(response.data)
            
        }
        fetchdata();
    },[movieId])

    useEffect(()=>{
        const findMovie = likedMovies.filter((movie)=>movie.data.data.id === data.id )
            if(findMovie.length>0){
                setFilteredMovie(findMovie);
                setLike(true)
            }

    },[data])

    function timeCalculator(totalMinutes){
        var hours = Math.floor(totalMinutes / 60);          
        var minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`
    }
    const handleLike = ()=>{
        if(!like){
            db.collection("users")
        .doc(user.uid)
        .collection('liked')
        .add({
            name: data.title || data.original_name, 
            data: data,
         })
        }else{
        db.collection("users")
        .doc(user.uid)
        .collection('liked')
        .doc(filteredMovie[0].id)
        .delete()
        }
    }
    const handleWatchLater = ()=>{
        db.collection("users")
        .doc(user.uid)
        .collection('watchlater')
        .add({
            name: data.title || data.original_name, 
            data:data })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = (name) => {
        db.collection("users")
        .doc(user.uid)
        .collection('playlist')
        .doc(name)
        .update({ data: firebase.firestore.FieldValue.arrayUnion(data)})
        setAnchorEl(null);
      };

      const newPlayListOpen = () => {
        setOpen(true);
        
      };
    
      const newPlayListClose = () => {
        setOpen(false);
        setName("")
        
      };
      const newPlayListCreate = () => {
        setOpen(false);
        db.collection("users")
        .doc(user.uid)
        .collection('playlist')
        .add({
            name: name, 
            data: [] })

        setName("")    
      };

    //   console.log(playList)

    return (
        <div className="detailPage" >
            {data.backdrop_path || movie.poster__path ?
              <img className="detailPage__background"src={`${image_api}${data.backdrop_path || data.poster_path}`} alt="movie poster"></img>
                :
                <img className="detailPage__background" src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="movie poster"></img>
                }
    
            <div className="detailPage__content">
                <div className="detailPage__body">
                <div className="detailPage__img">
                {data.backdrop_path || movie.poster__path ?
              <motion.img initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1}} src={`${image_api}${data.poster_path || data.backdrop_path}`} alt="movie poster"></motion.img>
                :
                <motion.img initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1}} src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="movie poster"></motion.img>
                }
            </div>
            <div className="detailPage__detail">
                <h1>{data.title || data.original_name}</h1>
                <div className="detailPage__facts">{data?.release_date} • {data?.genres?.map((gen)=>(`${gen.name} | `))} • {data.runtime && timeCalculator(data.runtime)}</div>
                <div className="detailPage__likes"><ThumbUpAltIcon/>{ data?.vote_count}</div>
                <div className="detailPage__icons">
                <Tooltip title="Mark as favorite">
                    <IconButton  onClick={()=> {handleLike();setLike(!like)}}>
                     <FavoriteIcon  style={like ? {color:"#EC4899"} : {color:"white"}}/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={anchorEl ? "": "Add to Playist"} >
                    <IconButton>
                    <PlaylistAddIcon  aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick} />

                    <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
               {playList.length>0 && playList.map((data) => (
              <MenuItem 
                onClick={() => {
                    handleClose(data.id);
                }}
              >
                {data.data.name}
              </MenuItem>
               ))
            }
            <MenuItem 
                onClick={() => {
                    newPlayListOpen()
                }}
              ><AddIcon/> Create Playlist </MenuItem>
            </Menu>

                                
                        <Dialog open={open} onClose={newPlayListClose} aria-labelledby="form-dialog-title">
                            <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                onChange={(e)=> setName(e.target.value)}
                                label="Playlist name"
                                type="text"
                                value={name}
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={newPlayListClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={newPlayListCreate} color="primary" disabled={ !name}>
                                Create
                            </Button>
                            </DialogActions>
                        </Dialog>



                     </IconButton>
                     </Tooltip>
                     <Tooltip title="Watch Later">
                    <IconButton >
                     <WatchLaterIcon onClick={()=> handleWatchLater()}/>
                    </IconButton>
                    </Tooltip>
                </div>
                <div className="detailPage__tagline">
                    <em>{data?.tagline}</em>
                </div>
                <div className="detailPage__about">
                    <h3>Overview</h3>
                    <p>{data.overview}</p>
                </div>
            </div>

                </div>

            </div>
        </div>
    )
}

export default DetailPage
