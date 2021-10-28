import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import { BrowserRouter } from "react-router-dom";
import ShareBnbApi from './Api';
import { useState } from 'react';
import UserContext from "./UserContext";

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


  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup and sets goRedirect
   * state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function handleSignUp(signupData) {
    let token = await ShareBnbApi.signup(signupData);
    setToken(token);
    setNeedsRedirect(true);
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
  }

  /** Handles site-wide logout. */
  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  return (
    <UserContext.Provider
      value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <Navbar handleLogout={handleLogout} />
          <Routes handleLogin={handleLogin} />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
