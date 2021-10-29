// import ShareBnbApi from "./Api";
// import { useEffect, useState } from "react";

/** Shows featured listings 
 * 
 *  Props:
 *  - listing
 * 
 *  State:
 *  - None
 * 
 *  Homepage -> FeatureListing
 * 
 */

function FeatureListing({ listing }) {
    return (
        <div className="card-body text-decoration-none">
            <h5 className="card-title text-center">
                {listing.name}
            </h5>
            <p className="text-center">
                <small>
                    {listing.city} {listing.state}, {listing.country}
                </small>
            </p>
            <div className="row">
                {listing.photoUrls[0] && <img src={listing.photoUrls[0]}
                    alt={listing.name}
                    className="float-end ms-5 mb-3 col" />}
                {/* <div className="col-10">
                <p className="text-left"><small>{description}</small></p>
            </div> */}
            </div>
        </div>
    )
}

export default FeatureListing;