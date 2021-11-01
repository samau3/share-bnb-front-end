import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
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
  const [needsRedirect, setNeedsRedirect] = useState(false);

  /** Gets single listing's information from database and stores in listing state */
  useEffect(function getListingDetail() {
    async function getListingFromApi() {
      setListing(await ShareBnbApi.getListing(id));
    }
    getListingFromApi();
  }, [id]);

  async function handleDelete() {
    const result = await ShareBnbApi.deleteListing(id);
    console.log({ result });
    setNeedsRedirect(true);
  }

  if (!listing) return <h1>Loading...</h1>;

  if (needsRedirect) return <Redirect to="/listings" />

  return (
    <div id={id} className="Listing mb-5">
      <h4 className="Listing">{listing.name}</h4>
      <span className="Listing">{listing.city}, {listing.state}, {listing.country}</span>
      <p className="Listing">${listing.price}</p>
      <p className="Listing mx-5">{listing.description}</p>
      <ControlledCarousel photoUrls={listing.photoUrls} />
      <button className="Listing btn btn-sm btn-primary mt-4" onClick={handleDelete}>Delete Listing</button>
    </div >
  );


}

export default Listing;