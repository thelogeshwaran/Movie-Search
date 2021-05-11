import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import "./Header.css";


function Header() {
    return (
        <div className="header">
            <div className="header__name">
                <h2>hulu</h2> 
            </div>
            <div className="header__icons">
                <div className="header__icon">
                <HomeIcon/>
                    <p>Home</p>
                </div>
                <div className="header__icon">
                <FlashOnIcon/>
                    <p>Trending</p>
                </div>
                <div className="header__icon">
                <VideoLibraryIcon/>
                    <p>Collections</p>
                </div>
                <div className="header__icon">
                <SearchIcon/>
                    <p>Search</p>
                </div>
                <div className="header__icon">
                <PersonIcon/>
                    <p>Profile</p>
                </div>
            </div>
            
        </div>
    )
}

export default Header
