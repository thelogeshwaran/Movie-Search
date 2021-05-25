import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ClearIcon from "@material-ui/icons/Clear";
import "./Navbar.css";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMovieProvider } from "../../Context/MovieContext";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useAuthProvider } from "../../Context/AuthContext";
import { GiPopcorn } from "react-icons/gi";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import MenuIcon from "@material-ui/icons/Menu";

function Header() {
  const [search, setSearch] = useState("");
  const { searchOpen, setSearchOpen, setMobileNavOpen } = useMovieProvider();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuthProvider();

  const signOut = () => {
    auth.signOut();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <div className="header">
        <Link to="/" className="link">
          <div className="header__name">
            <h2>
              <GiPopcorn
                style={{ marginBottom: "10px", transform: "rotate(30deg)" }}
              />
              DMDB
            </h2>
          </div>
        </Link>
        <div className="header__icons desktop">
          <Link to="/" className="link">
            <div className="header__icon">
              <HomeIcon />
              <p>Home</p>
            </div>
          </Link>
          <Link to={`/watchlater/${user.uid}`} className="link">
            <div className="header__icon">
              <WatchLaterIcon />

              <p>WatchLater</p>
            </div>
          </Link>
          <Link to={`/playlist/${user.uid}`} className="link">
            <div className="header__icon">
              <VideoLibraryIcon />
              <p>PlayList</p>
            </div>
          </Link>
          <Link to={`/`} className="link">
            <div
              className="header__icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <SearchIcon />
              <p>Search</p>
            </div>
          </Link>
          <div
            className="header__icon"
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
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              )}
            </MenuItem>
            <Link to={`/playlist/${user.uid}`} className="link">
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                PlayList
              </MenuItem>
            </Link>
            <Link to={`/liked/${user.uid}`} className="link">
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                Favorite
              </MenuItem>
            </Link>
            <Link to={`/watchlater/${user.uid}`} className="link">
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
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
        <div className="mobile">
          <MenuIcon onClick={() => setMobileNavOpen(true)} />
        </div>
      </div>
      {searchOpen && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              required
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <ClearIcon
              onClick={() => {
                setSearch("");
                setSearchOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Header;
