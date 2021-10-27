import React from "react";
import { Link } from "react-router-dom";

// import "./CompanyCard.css";

/** Show limited information about a listing
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function ListingCard({ name, city, state, country, description, photoUrl, id }) {
    console.debug("ListingCard", photoUrl);

    return (
        <Link className="ListingCard card" to={`/listings/${id}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {photoUrl && <img src={photoUrl}
                        alt={name}
                        className="float-end ms-5" />}
                </h6>
                <p><small>{description}</small></p>
                <p><small>{city} {state}, {country}</small></p>
            </div>
        </Link>
    );
}

export default ListingCard;
