import React from "react";
import { Link } from "react-router-dom";


/** Show limited information about a listing
 *
 * Props: 
 * - Information about a single listing
 * - { id, name, city, state, country, description, photoUrl }
 * 
 * State:
 * - None
 *
 * Listings -> ListingCard
 */

function ListingCard({ name, city, state, country, description, photoUrl, id }) {
    console.debug("ListingCard", photoUrl);

    return (
        <Link className="ListingCard card mb-1" to={`/listings/${id}`}>
            <div className="card-body text-decoration-none">
                <h5 className="card-title text-center">
                    {name}
                </h5>
                    <p className="text-center"><small>{city} {state}, {country}</small></p>
                <div className="row">
                    {photoUrl && <img src={photoUrl}
                        alt={name}
                        className="float-end ms-5 mb-3 col" />}
                    {/* <div className="col-10">
                        <p className="text-left"><small>{description}</small></p>
                    </div> */}
                </div>
            </div>
        </Link>
    );
}

export default ListingCard;
