import React, { useState, useEffect } from "react";
import { auth } from "../Components/Firebase/firebase";
import "./Authentication.css";
import { FcGoogle } from "react-icons/fc";
import { useAuthProvider } from "../Context/AuthContext";
import firebase from "firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

function Authentication() {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordShow, setPasswordShow] = useState("password");
  const { user, setUser } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("set");
        setUser(user);
        navigate("/");
      } else {
        console.log("come");
        setUser(false);
      }
    });
  }, []);

  console.log("auth", user);
  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
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
  const fillForm = () => {
    setEmail("admin@gmail.com");
    setPassword("admin@45");
  };

  return (
    <div className="auth">
      <div className="wrapper fadeInDown">
        <div className="formContent">
          <h2
            className={newUser ? "inactive underlineHover" : "active"}
            onClick={() => {
              setNewUser(false);
              clearInputs();
            }}
          >
            {" "}
            Sign In{" "}
          </h2>
          <h2
            className={newUser ? "active" : "inactive underlineHover"}
            onClick={() => {
              setNewUser(true);
              clearInputs();
            }}
          >
            Sign Up{" "}
          </h2>

          <div className="fadeIn first">
            <FcGoogle
              style={{
                height: "40px",
                width: "40px",
                cursor: "pointer",
                margin: "10px",
              }}
              onClick={() => hanldeGoogleAuth()}
            />
          </div>
          <div className="breakline"></div>
          {!newUser ? (
            <form onSubmit={(event) => handleLogin(event)}>
              <input
                type="email"
                className="input"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className="password-field">
                <input
                  type={passwordShow}
                  className="input"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div>
                  {passwordShow === "password" ? (
                    <AiFillEye
                      onClick={() => setPasswordShow("text")}
                      style={{
                        margin: "-20px 0px -20px -50px",
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setPasswordShow("password")}
                      style={{
                        margin: "-20px 0px -20px -50px",
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              </div>
              <button type="submit" className="submit">
                Sign In
              </button>
              <button
                className="submit"
                type="button"
                onClick={() => fillForm()}
              >
                Guest
              </button>
            </form>
          ) : (
            <form onSubmit={(event) => handleSignUp(event)}>
              <input
                type="text"
                className="input"
                placeholder="UserName"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                type="email"
                className="input"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className="password-field">
                <input
                  type={passwordShow}
                  className="input"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div>
                  {passwordShow === "password" ? (
                    <AiFillEye
                      onClick={() => setPasswordShow("text")}
                      style={{
                        margin: "-20px 0px -20px -50px",
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setPasswordShow("password")}
                      style={{
                        margin: "-20px 0px -20px -50px",
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="submit">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
