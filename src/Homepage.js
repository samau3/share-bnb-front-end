import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShareBnbApi from "./Api";
import FeaturedListing from "./FeaturedListing";

const DEFAULT_FEATURE_IDS = [11, 8];

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
 *  Events:
 *  - None
 * 
 *  Routes -> Homepage -> FeatureListing
 */
function Homepage({ featureIds = DEFAULT_FEATURE_IDS }) {
    const [featuredListings, setFeaturedListings] = useState([]);
    const [needsLoading, setNeedsLoading] = useState(true);

    /** Gets two listings from database and store in featuredListings */
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
            </div>
            <h3>FEATURED LISTINGS</h3>
            <div className="row">
                {featuredListings.map(l => {
                    const listingTo = `listings/${l.id}`
                    return (
                        <div className="col" key={l.id}>
                            <Link to={listingTo}>
                                <FeaturedListing
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