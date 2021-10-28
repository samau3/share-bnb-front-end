import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./Homepage";
import Listings from "./Listings";
import Listing from "./Listing";
import NewListingForm from "./NewListingForm";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";
import SignUpForm from "./SignUpForm";

/** Site-wide routes. Visiting a non-existant route
 *  redirects to the homepage.
 *  
 *  Props: 
 *  - None
 * 
 *  State:
 *  - None
 * 
 *  App -> Routes 
 *          -> { Homepage, LoginForm, SignUpForm }
 *          -> { Listing, Listings, NewListingForm }
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

            <PrivateRoute exact path="/listings">
                <Listings />
            </PrivateRoute>

            <PrivateRoute exact path="/listings/:id">
                <Listing />
            </PrivateRoute>

            <PrivateRoute exact path="/addListing">
                <NewListingForm />
            </PrivateRoute>

            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;