/** Component for homepage
 * 
 *  Props:
 *  - None
 * 
 *  State: 
 *  - None
 * 
 *  App -> Routes -> Homepage
 */

function Homepage() {
    return (
        <div className="Homepage container text-center mt-5">
            <div className="jumbotron">
            <h1 className="Homepage-header mb-4 fw-bold display-1">Share BnB</h1>
            <p className="lead">Find a place to stay.</p>
            {/* {currentUser &&
                <h2>Welcome {currentUser.firstName} {currentUser.lastName}!</h2>
            } */}
            </div>
        </div>
    )
}

export default Homepage;