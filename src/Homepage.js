import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShareBnbApi from "./Api";
import FeatureListing from "./FeatureListing";
// import SearchForm from "./SearchForm";


/** Component for homepage
 * 
 *  Props:
 *  - None
 * 
 *  State:
 *  - featureIds: an array of ids for the featured listing section [3, 8]
 *  - featuredListings: an array of listings from the featured listing
 *  - needsLoading: true/false
 * 
 *  Routes -> Homepage -> FeatureListing
 */

function Homepage() {
    const [featureIds, setFeatureIds] = useState([6, 8]);
    const [featuredListings, setFeaturedListings] = useState([]);
    const [needsLoading, setNeedsLoading] = useState(true);

    useEffect(function getFeatureListingOnMount() {
        async function getFeatureListing() {
            const listings = await Promise.all(featureIds.map(async (id) => {
                return await ShareBnbApi.getListing(id);
            }))
            setFeaturedListings(listings);
            setNeedsLoading(false);
        }
        getFeatureListing()
    }, [featureIds])

    if (needsLoading) return <h1>Loading...</h1>

    return (
        <div className="Homepage container text-center mt-5">
            <div className="jumbotron">
                <h1 className="Homepage-header mb-4 fw-bold display-1">Share BnB</h1>
                <p className="lead">Find a private outdoor space.</p>
                {/* <SearchForm searchFor={searchFor} /> */}
                {/* {currentUser &&
                <h2>Welcome {currentUser.firstName} {currentUser.lastName}!</h2>
            } */}
            </div>
            <h3>FEATURED LISTINGS</h3>
            <div className="row">
                {featuredListings.map(l => {
                    const listingTo = `listings/${l.id}`
                    return (
                        <div className="col" key={l.id}>
                            <Link to={listingTo}>
                                <FeatureListing
                                    listing={l}
                                />
                            </Link>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Homepage;