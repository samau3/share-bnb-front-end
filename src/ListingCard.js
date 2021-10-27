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
        <Link className="ListingCard card" to={`/listings/${id}`}>
            <div className="card-body text-decoration-none">
                <h5 className="card-title text-center">
                    {name}
                </h5>
                <div className="row">
                    {photoUrl && <img src={photoUrl}
                        alt={name}
                        className="float-end ms-5 col-2 img-thumbnail" />}
                    <div className="col">
                        <p className="text-left"><small>{description}</small></p>
                        <p className="text-left"><small>{city} {state}, {country}</small></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ListingCard;
