import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
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
      <Carousel photoUrls={listing.photoUrls} />
      {/* {listing.photoUrls.map(photo => (
        <img className="Listing w-75 mb-2" src={photo} alt="listing" key={photo} />))} */}

      {/* <div id="listingCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {listing.photoUrls[0] && <div className="carousel-item active" ><img className="d-block w-100" src={listing.photoUrls[0]} alt="listing" /></div>}
          {listing.photoUrls[1] && <div className="carousel-item" ><img className="d-block w-100" src={listing.photoUrls[1]} alt="listing" /></div>}
          {listing.photoUrls[2] && <div className="carousel-item" ><img className="d-block w-100" src={listing.photoUrls[2]} alt="listing" /></div>}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#listingCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#listingCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
    </div >
  );


}

export default Listing;