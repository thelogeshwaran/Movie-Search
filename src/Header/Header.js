import React, { useEffect, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import "./Header.css";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useMovieProvider} from "../Context/MovieProvider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useAuthProvider } from "../Context/AuthProvider";



function Header() {
    const[ search, setSearch] = useState("");
    const {searchOpen, setSearchOpen}= useMovieProvider();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = useAuthProvider();
    // console.log(user)
    const signOut = () => {
        auth.signOut();
      };

      const handleSubmit =(e)=>{
         e.preventDefault();
         navigate(`/search/${search}`)
      }

      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    return (
        <div >
            <div className="header">
            <div className="header__name">
                <h2>hulu</h2> 
            </div>
            <div className="header__icons">
            
                <Link to="/" className="link" >
                <div className="header__icon">
                <HomeIcon/>
                    <p>Home</p>
                    </div>
                    </Link>
                
                <div className="header__icon">
                <FlashOnIcon/>
                    <p>Trending</p>
                </div>
                <Link to={`/playlist/${user.uid}`} className="link" >
                <div className="header__icon">
                <VideoLibraryIcon/>
                    <p>Collections</p>
                </div>
                </Link>
                <div className="header__icon" onClick={()=>setSearchOpen(!searchOpen)}>
                <SearchIcon />
                    <p >Search</p>
                </div>
                <div className="header__icon" aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
                <PersonIcon  />
                    <p >Profile</p>
                </div>
                <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
                <MenuItem style={{textTransform:"uppercase", fontWeight:"bold"}}
                onClick={() => {
                  handleClose();
                }}
              >
                {user?.displayName}
              </MenuItem>
              <Link to={`/playlist/${user.uid}`} className="link" >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                PlayList
              </MenuItem>
              </Link>
              <Link to={`/liked/${user.uid}`} className="link" >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                Favorite
              </MenuItem>
              </Link>
              <Link to={`/watchlater/${user.uid}`} className="link" >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                WatchLater
              </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
            </div>
            </div>
            {
                searchOpen && 
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="search">
                        <input type="text" value={search} placeholder="Search.."  onChange={(e)=>setSearch(e.target.value)}></input>
                        { search ? <ClearIcon onClick={()=> setSearch("")} style={{cursor:"pointer"}}/> : <SearchIcon />}
                    </div>
                    </form>
            }
            
            
        </div>
    )
}

export default Header
