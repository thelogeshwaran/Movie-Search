import "./MobileNav.css";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { auth } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import { useMovieProvider } from "../../Context/MovieProvider";
import { useAuthProvider } from "../../Context/AuthProvider";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

function MobileNav() {
  const { user } = useAuthProvider();
  const { searchOpen, setSearchOpen, setMobileNavOpen } = useMovieProvider();
  

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="mobilenav">
      <div className="mobile__close" onClick={() => setMobileNavOpen(false)}>
        <ClearIcon />
      </div>
      <div className="mobile__headerIcons">
        <Link to="/" className="link" onClick={() => setMobileNavOpen(false)}>
          <div className="mobile__icon">
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link
          to={`/watchlater/${user.uid}`}
          className="link"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className="mobile__icon">
            <WatchLaterIcon />
            <p>WatchLater</p>
          </div>
        </Link>
        <Link
          to={`/playlist/${user.uid}`}
          className="link"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className="mobile__icon">
            <VideoLibraryIcon />
            <p>Collections</p>
          </div>
        </Link>
        <Link
          to={`/liked/${user.uid}`}
          className="link"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="mobile__icon"
          >
            <ThumbUpIcon />
            <p>Favorites</p>
          </div>
        </Link>

        <Link to={`/`} className="link" onClick={() => setMobileNavOpen(false)}>
          <div className="mobile__icon" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
            <p>Search</p>
          </div>
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="link"
            onClick={() => setMobileNavOpen(false)}
          >
            <div className="mobile__icon">
              <VpnKeyIcon />
              <p>Login</p>
            </div>
          </Link>
        ) : (
          <div
            className="mobile__icon"
            onClick={() => {
              signOut();
              setMobileNavOpen(false);
            }}
          >
            <ExitToAppIcon />
            <p>LogOut</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileNav;
