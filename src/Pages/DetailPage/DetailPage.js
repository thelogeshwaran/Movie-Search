import React, { useEffect, useState } from "react";
import "./DetailPage.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Tooltip from "@material-ui/core/Tooltip";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMovieProvider } from "../../Context/MovieContext";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ReactPlayer from "react-player";
import axios from "axios";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Loader } from "../../Components/Loader/Loader";
import { useDetailePageContext } from "../../Context/DetailPageContext";

function DetailPage() {
  const {
    data,
    setData,
    like,
    setLike,
    setFilteredMovie,
    watchLaterIcon,
    setWatchLaterIcon,
    setWatchLaterMovie,
    handleLike,
    handleWatchLater,
    timeCalculator,
    handleClick,
    handleClose,
    newPlayListClose,
    newPlayListCreate,
    newPlayListOpen,
    handlePlayer,
    anchorEl,
    open,
    name,
    setName,
    selected,
    setSelected,
  } = useDetailePageContext();
  const { movieId } = useParams();
  const { likedMovies, playList, watchLater } = useMovieProvider();
  const [loader, setLoader] = useState(true);

  const movie_api = "https://api.themoviedb.org/3/movie/";
  const image_api = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchdata() {
      setLoader(true);
      const response = await axios.get(
        `${movie_api}${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      );
      setData(response.data);
      setLoader(false);
    }
    fetchdata();
  }, [movieId]);

  useEffect(() => {
    const findMovie = likedMovies.filter(
      (movie) => movie.data.data.id === data.id
    );
    const watchlatermovie = watchLater.filter(
      (movie) => movie.data.data.id === data.id
    );
    if (watchlatermovie.length > 0) {
      setWatchLaterMovie(watchlatermovie);
      setWatchLaterIcon(true);
    }
    if (findMovie.length > 0) {
      setFilteredMovie(findMovie);
      setLike(true);
    }
  }, [likedMovies, watchLater]);

  return (
    <div>
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className="detailPage">
          {data.backdrop_path || data.poster__path ? (
            <img
              className="detailPage__background"
              src={`${image_api}${data.backdrop_path || data.poster_path}`}
              alt="movie poster"
            ></img>
          ) : (
            <img
              className="detailPage__background"
              src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="movie poster"
            ></img>
          )}

          <div className="detailPage__content">
            <div className="detailPage__body">
              <div className="detailPage__img">
                {data.backdrop_path || data.poster__path ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    src={`${image_api}${
                      data.poster_path || data.backdrop_path
                    }`}
                    alt="movie poster"
                  ></motion.img>
                ) : (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="movie poster"
                  ></motion.img>
                )}
              </div>
              <div className="detailPage__detail">
                <h1>{data.title || data.original_name}</h1>
                <div className="detailPage__facts">
                  {data?.release_date} •{" "}
                  {data?.genres?.map((gen) => `${gen.name} | `)} •{" "}
                  {data.runtime && timeCalculator(data.runtime)}
                </div>
                <div className="detailPage__likes">
                  <ThumbUpAltIcon style={{ marginRight: "10px" }} />
                  {data?.vote_count}
                </div>
                <div className="detailPage__icons">
                  <Tooltip title="Mark as favorite">
                    <IconButton onClick={() => handleLike()}>
                      <FavoriteIcon
                        style={like ? { color: "#EC4899" } : { color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={anchorEl ? "" : "Add to Playist"}>
                    <IconButton>
                      <PlaylistAddIcon
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      />

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose()}
                      >
                        {playList.length > 0 &&
                          playList.map((data) => (
                            <MenuItem
                              onClick={() => {
                                handleClose(data.id);
                              }}
                            >
                              {data.data.name}
                            </MenuItem>
                          ))}
                        <MenuItem
                          onClick={() => {
                            newPlayListOpen();
                          }}
                        >
                          <AddIcon /> Create Playlist{" "}
                        </MenuItem>
                      </Menu>

                      <Dialog
                        open={open}
                        onClose={newPlayListClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            onChange={(e) => setName(e.target.value)}
                            label="Playlist name"
                            type="text"
                            value={name}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={newPlayListClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={newPlayListCreate}
                            color="primary"
                            disabled={!name}
                          >
                            Create
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Watch Later">
                    <IconButton>
                      <WatchLaterIcon
                        onClick={() => handleWatchLater()}
                        style={
                          watchLaterIcon
                            ? { color: "#EC4899" }
                            : { color: "white" }
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Play Trailer">
                    <IconButton onClick={() => setSelected(true)}>
                      <PlayArrowIcon />
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
          {selected && (
            <div className="modal" onClick={handlePlayer}>
              <ReactPlayer
                className="react-player"
                url={`https://youtu.be/${
                  data?.videos?.results[0]?.key || data?.videos?.results[1]?.key
                }`}
                width="100%"
                height="100%"
                controls="true"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailPage;
