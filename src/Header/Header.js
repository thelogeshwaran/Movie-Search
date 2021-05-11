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



function Header() {
    const[ search, setSearch] = useState("");
    const[ searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();


    const signOut = () => {
        auth.signOut();
      };

      const handleSubmit =(e)=>{
         e.preventDefault();
         navigate(`/search/${search}`)
      }
    return (
        <div >
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
                <SearchIcon onClick={()=>setSearchOpen(!searchOpen)}/>
                    <p >Search</p>
                </div>
                <div className="header__icon">
                <PersonIcon onClick={()=> signOut()}/>
                    <p>Profile</p>
                </div>
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
