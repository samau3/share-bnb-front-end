import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from 'react';

import "./App.css";
import ShareBnbApi from './Api';
import UserContext from "./UserContext";

import Routes from './Routes';
import Navbar from './Navbar';


const LOCAL_STORAGE_TOKEN_KEY = "token";

/** ShareBnB application.
 * 
 *  Props:
 *  - None
 * 
 *  State:
 *  - needsInfo: true/false
 *  - currentUser: { username, firstName, lastName, email, isAdmin }
 *  - token: string returned from the server/local storage
 *  - needsRedirect: true/false
 *
 * App -> { Routes, Navbar }
 */

function App() {
  const [needsInfo, setNeedsInfo] = useState(true);
  const [needsRedirect, setNeedsRedirect] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
  const [currentUser, setCurrentUser] = useState(null);

  console.debug(
    "App",
    "needsInfo=", needsInfo,
    "currentUser=", currentUser,
    "token=", token,
    "needsRedirect=", needsRedirect,
  );

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          ShareBnbApi.token = token;
          let resultUser = await ShareBnbApi.getCurrentUser(username);
          setCurrentUser(resultUser);
          setNeedsRedirect(false);
          setNeedsInfo(false);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);


  /** Handles site-wide signup.
   *
   *  Automatically logs them in (set token) upon signup, sets 
   *  localStorage with the token and sets needsRedirect state
   *  to true.
   */
  async function handleSignUp(signUpData) {
    let token = await ShareBnbApi.signUp(signUpData);
    setToken(token);
    setNeedsRedirect(true);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  /** Handles site-wide login.
   *
   *  Logs in a user, sets localStorage with token and sets 
   *  needsRedirect state to true.
   */
  async function handleLogin(loginData) {
    let token = await ShareBnbApi.login(loginData);
    setToken(token);
    setNeedsRedirect(true);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  /** Handles site-wide logout. 
   * 
   *  sets currentUser and token to null and removes the token
   *  from localStorage.
  */
  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  if (needsRedirect) {
    return <Redirect push to="/" />
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <Navbar handleLogout={handleLogout} />
        <Routes handleLogin={handleLogin} handleSignUp={handleSignUp} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
