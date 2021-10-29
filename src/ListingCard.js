import React from "react";
import { Link } from "react-router-dom";


/** Show basic information about a listing
 *
 *  Props: 
 *  - id, name, city, state, country, photoUrl
 *  - Information about a single listing
 * 
 *  State:
 *  - None
 * 
 *  Events:
 *  - None
 *
 *  Listings -> ListingCard
 */

function ListingCard({ id, name, city, state, country, photoUrls }) {
  return (
    <Link className="ListingCard card mb-1 col-xl-5 mx-1" to={`/listings/${id}`}>
      <div className="card-body text-decoration-none">
        <h5 className="card-title text-center">{name}</h5>
        <p className="text-center"><small>{city} {state}, {country}</small></p>
        <div className="row">
          {photoUrls &&
            <img src={photoUrls[0]}
              alt={name}
              className="float-end ms-5 mb-3 col" />}
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
