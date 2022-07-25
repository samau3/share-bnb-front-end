import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./Homepage";
import PrivateRoute from "./PrivateRoute";
import Listings from "./Listings";
import Listing from "./Listing";
import NewListingForm from "./NewListingForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

/** Site-wide routes. Visiting a non-existant route
 *  redirects to the homepage.
 *  
 *  Props: 
 *  - handleLogin: function to be called in App
 *  - handleSignUp: function to be called in App
 * 
 *  State:
 *  - None
 * 
 *  Events:
 *  - None
 * 
 *  App -> Routes 
 *          -> { Homepage, LoginForm, SignUpForm }
 *          -> Private Routes -> { Listing, Listings, NewListingForm }
 */
function Routes({ handleLogin, handleSignUp }) {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>

            <Route exact path="/login">
                <LoginForm handleLogin={handleLogin} />
            </Route>

            <Route exact path="/signup">
                <SignUpForm handleSignUp={handleSignUp} />
            </Route>

            <Route exact path="/listings">
                <Listings />
            </Route>

            <Route exact path="/listings/:id">
                <Listing />
            </Route>

            <PrivateRoute exact path="/addListing">
                <NewListingForm />
            </PrivateRoute>

            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;