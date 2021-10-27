import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareBnbApi from "./Api";

/** Listing Detail page.
 *
 * Renders information about listing.
 *
 * Routed at /listings/:id
 *
 * Routes -> Listing
 */

function Listing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(function getListingDetail() {
        async function getListingFromApi() {
            setListing(await ShareBnbApi.getListing(id));
        }
        getListingFromApi();
    }, [id]);

    if (!listing) return <h1>Loading...</h1>;

    return (
      <div id={id} className="Listing col-md-8 offset-md-2">
        <h4 className="Listing">{listing.name}</h4>
        <p className="Listing">{listing.city}, {listing.state}, {listing.country}</p>
        <p className="Listing">{listing.description}</p>
        {listing.photoUrl && <img className="Listing w-75" src={listing.photoUrl} alt="listing" />}
      </div>
    );
}

export default Listing;