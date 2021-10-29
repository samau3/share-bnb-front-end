import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ControlledCarousel from "./ControlledCarousel";
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
 *  Events:
 *  - None
 * 
 *  Routes -> Listing
 */

function Listing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  /** Gets single listing's information from database and stores in listing state */
  useEffect(function getListingDetail() {
    async function getListingFromApi() {
      setListing(await ShareBnbApi.getListing(id));
    }
    getListingFromApi();
  }, [id]);

  if (!listing) return <h1>Loading...</h1>;

  return (
    <div id={id} className="Listing mb-5">
      <h4 className="Listing">{listing.name}</h4>
      <span className="Listing">{listing.city}, {listing.state}, {listing.country}</span>
      <p className="Listing">${listing.price}</p>
      <p className="Listing mx-5">{listing.description}</p>
      <ControlledCarousel photoUrls={listing.photoUrls} />
      {/* {listing.photoUrls.map(photo => (
        <img className="Listing w-75 mb-2" src={photo} alt="listing" key={photo} />))} */}
    </div >
  );


}

export default Listing;