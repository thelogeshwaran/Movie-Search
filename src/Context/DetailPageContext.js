import React, { createContext, useContext, useState } from "react";
import { db } from "../Components/Firebase/firebase";
import { useAuthProvider } from "../Context/AuthContext";
import { toast } from "react-toastify";
import firebase from "firebase";

const DetailPageContext = createContext();

export function DetailePageProvider({ children }) {
  const [data, setData] = useState([]);
  const [like, setLike] = useState(false);
  const { user } = useAuthProvider();
  const [filteredMovie, setFilteredMovie] = useState("");
  const [watchLaterIcon, setWatchLaterIcon] = useState(false);
  const [watchlatermovie, setWatchLaterMovie] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);

  const handleLike = () => {
    if (user) {
      if (!like) {
        db.collection("users")
          .doc(user.uid)
          .collection("liked")
          .add({
            name: data.title || data.original_name,
            data: data,
          });
        setLike(true);
      } else {
        db.collection("users")
          .doc(user.uid)
          .collection("liked")
          .doc(filteredMovie[0].id)
          .delete();
        setLike(false);
      }
    } else {
      toast.error("You need to LogIn!");
    }
  };
  const handleWatchLater = () => {
    if (user) {
      if (!watchLaterIcon) {
        db.collection("users")
          .doc(user.uid)
          .collection("watchlater")
          .add({
            name: data.title || data.original_name,
            data: data,
          });
        setWatchLaterIcon(true);
      } else {
        db.collection("users")
          .doc(user.uid)
          .collection("watchlater")
          .doc(watchlatermovie[0]?.id)
          .delete();
        setWatchLaterIcon(false);
      }
    } else {
      toast.error("You need to LogIn!");
    }
  };

  function timeCalculator(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  const handleClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      toast.error("You need to LogIn!");
    }
  };

  const handleClose = (name) => {
    if (name) {
      db.collection("users")
        .doc(user.uid)
        .collection("playlist")
        .doc(name)
        .update({ data: firebase.firestore.FieldValue.arrayUnion(data) });
    }
    setAnchorEl(null);
  };

  const newPlayListOpen = () => {
    setOpen(true);
  };

  const newPlayListClose = () => {
    setOpen(false);
    setName("");
  };
  const newPlayListCreate = () => {
    setOpen(false);
    db.collection("users").doc(user.uid).collection("playlist").add({
      name: name,
      data: [],
    });

    setName("");
  };

  const handlePlayer = (e) => {
    if (e.target.classList.contains("modal")) {
      setSelected(null);
    }
  };

  return (
    <DetailPageContext.Provider
      value={{
        data,
        setData,
        like,
        setLike,
        filteredMovie,
        setFilteredMovie,
        watchLaterIcon,
        setWatchLaterIcon,
        watchlatermovie,
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
        setAnchorEl,
        open,
        setOpen,
        name,
        setName,
        selected,
        setSelected,
      }}
    >
      {children}
    </DetailPageContext.Provider>
  );
}

export function useDetailePageContext() {
  return useContext(DetailPageContext);
}
