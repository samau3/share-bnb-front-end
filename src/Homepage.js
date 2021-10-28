import FeatureListing from "./FeatureListing";
import ShareBnbApi from "./Api";
import ListingCard from "./ListingCard";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

/** Component for homepage
 * 
 *  Props:
 *  - None
 * 
 *  State: 
 *  - None
 * 
 *  App -> Routes -> Homepage
 */

function Homepage() {

    const [featuredListings, setFeaturedListings] = useState([]);
    const [needsLoading, setNeedsLoading] = useState(true);
    const [featureIds, setFeatureIds] = useState([3, 8]);
    console.log("Homepage", { featuredListings, needsLoading });

    useEffect(function getFeatureListingOnMount() {
        async function getFeatureListing() {
            const listings = await Promise.all(featureIds.map(async (id) => {
                return await ShareBnbApi.getListing(id);
            }))
            setFeaturedListings(listings);
            // const feature1 = await ShareBnbApi.getListing(id1);
            // const feature2 = await ShareBnbApi.getListing(id2);
            // setListings([feature1, feature2]);
            setNeedsLoading(false);
        }
        getFeatureListing()
    }, [featureIds])

    if (needsLoading) return <h1>Loading...</h1>

    console.log("Homepage end", { featuredListings, needsLoading });
    return (
        <div className="Homepage container text-center mt-5">
            <div className="jumbotron">
                <h1 className="Homepage-header mb-4 fw-bold display-1">Share BnB</h1>
                <p className="lead">Find a place to stay.</p>
                <SearchForm />
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