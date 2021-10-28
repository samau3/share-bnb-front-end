import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import { BrowserRouter, Redirect } from "react-router-dom";
import ShareBnbApi from './Api';
import { useState, useEffect } from 'react';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";

const LOCAL_STORAGE_TOKEN_KEY = "token"
/** ShareBnB application.
 *
 * App -> { Routes, Navbar }
 */

function App() {
  const [needsInfo, setNeedsInfo] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
  const [needsRedirect, setNeedsRedirect] = useState(false);

  console.debug(
    "App",
    "infoLoaded=", needsInfo,
    "currentUser=", currentUser,
    "token=", token,
    "goRedirect=", needsRedirect,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          ShareBnbApi.token = token;
          let currentUser = await ShareBnbApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setNeedsRedirect(false);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setNeedsInfo(false);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setNeedsInfo(true);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup and sets goRedirect
   * state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function handleSignUp(signUpData) {
    let token = await ShareBnbApi.signUp(signUpData);
    setToken(token);
    setNeedsRedirect(true);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  /** Handles site-wide login.
   *
   * Logs in a user and sets needsRedirect state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function handleLogin(loginData) {
    let token = await ShareBnbApi.login(loginData);
    setToken(token);
    setNeedsRedirect(true);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  /** Handles site-wide logout. */
  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  if (needsRedirect) {
    return <Redirect push to="/" />
  }

  return (
    <UserContext.Provider
      value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <Navbar handleLogout={handleLogout} />
          <Routes handleLogin={handleLogin} handleSignUp={handleSignUp}/>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
