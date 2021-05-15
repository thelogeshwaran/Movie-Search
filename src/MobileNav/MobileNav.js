import "./MobileNav.css";
import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ClearIcon from "@material-ui/icons/Clear";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMovieProvider } from "../Context/MovieProvider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useAuthProvider } from "../Context/AuthProvider";
import { GiPopcorn } from "react-icons/gi";
import WatchLaterIcon from "@material-ui/icons/WatchLater";



function MobileNav() {
  const { user } = useAuthProvider();
  const { searchOpen, setSearchOpen, setMobileNavOpen } = useMovieProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="mobilenav">
      <div className="mobile__close" onClick={()=>setMobileNavOpen(false)}>
            <ClearIcon />
          </div>
      <div className="mobile__headerIcons">
        <Link to="/" className="link" onClick={()=>setMobileNavOpen(false)}>
          <div className="mobile__icon">
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link to={`/watchlater/${user.uid}`} className="link" onClick={()=>setMobileNavOpen(false)}>
          <div className="mobile__icon">
            <WatchLaterIcon />
            <p>WatchLater</p>
          </div>
        </Link>
        <Link to={`/playlist/${user.uid}`} className="link" onClick={()=>setMobileNavOpen(false)}>
          <div className="mobile__icon">
            <VideoLibraryIcon />
            <p>Collections</p>
          </div>
        </Link>
        <Link to={`/`} className="link" onClick={()=>setMobileNavOpen(false)}>
          <div
            className="mobile__icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchIcon />
            <p>Search</p>
          </div>
        </Link>
        <div
          className="mobile__icon"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <PersonIcon />
          <p>Profile</p>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            style={{ textTransform: "uppercase", fontWeight: "bold" }}
            onClick={() => {
              handleClose();
            }}
          >
            {user ? (
              user.displayName
            ) : (
              <Link to="/login" className="link" onClick={()=> setMobileNavOpen(false)}>
                LOGIN
              </Link>
            )}
          </MenuItem>
          <Link to={`/playlist/${user.uid}`} className="link" onClick={()=> setMobileNavOpen(false)}>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              PlayList
            </MenuItem>
          </Link>
          <Link to={`/liked/${user.uid}`} className="link" onClick={()=> setMobileNavOpen(false)}>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              Favorite
            </MenuItem>
          </Link>
          <Link to={`/watchlater/${user.uid}`} className="link" onClick={()=> setMobileNavOpen(false)}>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              WatchLater
            </MenuItem>
          </Link>
          {user && (
            <MenuItem
              onClick={() => {
                signOut();
                setMobileNavOpen(false);
              }}
            >
              Logout
            </MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default MobileNav;
