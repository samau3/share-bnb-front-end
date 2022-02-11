import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import ControlledCarousel from "./ControlledCarousel";

import ShareBnbApi from "./Api";
import UserContext from "./UserContext";

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
  const currentUser = useContext(UserContext);
  const [listing, setListing] = useState(null);
  const [needsRedirect, setNeedsRedirect] = useState(false);

  /** Gets single listing's information from database and stores in listing state */
  useEffect(function getListingDetail() {
    async function getListingFromApi() {
      setListing(await ShareBnbApi.getListing(id));
    }
    getListingFromApi();
  }, [id]);

  /** deletes listing when button is clicked  */
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
      <p className="Listing">${listing.price.toLocaleString()}</p>
      <div className="container w-75 mb-4">
        <p className="Listing">{listing.description}</p>
      </div>
      <ControlledCarousel photoUrls={listing.photoUrls} />
      {currentUser.username === listing.username | currentUser.isAdmin
        ? <button className="Listing btn btn-sm btn-primary mt-4" onClick={handleDelete}>
          Delete Listing
        </button>
        : null}
    </div>
  );
}

export default Listing;