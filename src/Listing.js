import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ShareBnbApi from "./Api";


/** Listing Detail page. Renders information about listing.
 *  Routed at /listings/:id
 * 
 *  Props:
 *  - None
 * 
 *  State:
 *  - listing: information about a single listing
 *
 *  Routes -> Listing
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
    <div id={id} className="Listing">
      <h4 className="Listing">{listing.name}</h4>
      <span className="Listing">{listing.city}, {listing.state}, {listing.country}</span>
      <p className="Listing">${listing.price}</p>
      <p className="Listing mx-5">{listing.description}</p>
      {listing.photoUrls.map(photo => (
        <img className="Listing w-75 mb-2" src={photo} alt="listing" key={photo} />))}
    </div>
  );
}

export default Listing;