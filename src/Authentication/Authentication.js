import React, { useState, useEffect } from 'react';
import {auth} from "../Firebase/firebase";
import "./Authentication.css";
import { FcGoogle } from "react-icons/fc";
import { useAuthProvider } from "../Context/AuthProvider";
import firebase from "firebase";
import { toast } from  "react-toastify";
 

function Authentication() {
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { user, setUser } = useAuthProvider();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(false);
          }
        });
      }, []);
    
      const clearInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        // setError("");
      };
    
      const handleLogin = (event) => {
        event.preventDefault();
        auth
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            clearInputs();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };
    
      const handleSignUp = (event) => {
        event.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            result.user
              .updateProfile({
                displayName: name,
              })
              .then(() => {
                clearInputs();
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };
    
      const hanldeGoogleAuth = () => {
        auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .catch((error) => {
            toast.error(error.message);
          });
      };

    return (
        <div className="auth">
            <div className="wrapper fadeInDown">
            <div className="formContent">
                <h2 className={ newUser ? "inactive underlineHover" : "active" } onClick={()=>{setNewUser(false);clearInputs();}}> Sign In </h2>
                <h2 className={ newUser ? "active" : "inactive underlineHover" } onClick={()=>{setNewUser(true); clearInputs();}}>Sign Up </h2>

            
                <div className="fadeIn first">
                    <FcGoogle style={{ height:"40px",width:"40px", cursor:"pointer", margin:"10px"}} onClick={hanldeGoogleAuth}/>
                </div>
                <div className="breakline"></div>
                {
                    !newUser ?
                     <form onSubmit={(event) => handleLogin(event)}>
                    <input type="email"  className="input"  placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password"  className="input"  placeholder="Password" required value={password}  onChange={(e) => setPassword(e.target.value)}></input>
                    {/* <div>
                        Credentials : Email - admin@gmail.com
                        <br /> password : admin@45
                    </div> */}
                    <button type="submit" className=" submit">Sign In</button>
                    </form>
                    :
                    <form onSubmit={(event) => handleSignUp(event)}>
                    <input type="text"  className="input"  placeholder="UserName" value={name} required onChange={(e) => setName(e.target.value)}></input>
                    <input type="email"  className="input"  placeholder="Email" required   value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password"  className="input"  placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit" className="submit">Sign Up</button>
                    </form>
                }

           

            </div>
            </div>
        </div>
    )
}

export default Authentication
