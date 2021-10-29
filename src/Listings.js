import React, { useState, useEffect } from "react";

import ShareBnbApi from "./Api";
import SearchForm from "./SearchForm";
import ListingCard from "./ListingCard";


/** Show page with list of listings.
 *
 *  On mount, loads listings from API.
 *  Re-loads filtered listings on submit from search form.
 *
 *  This is routed to at /listings
 * 
 *  Props: 
 *  - None
 * 
 *  State:
 *  - listings: an array of listings
 *      [ { id, name, street, city, state, country, description, photoUrls, price },...]
 * 
 *  Routes -> Listings -> { SearchForm, ListingCard }
 */

function Listings() {
    const [listings, setListings] = useState(null);

    useEffect(function getListingsOnMount() {
        search();
    }, []);

    /** Triggered by search form submit; reloads listings. */
    async function search(searchTermsData) {
        let resultListings = await ShareBnbApi.getListings(searchTermsData);
        setListings(resultListings);
    }

    if (!listings) return <h1>Loading...</h1>;

    return (
        <div className="Listings col-md-8 offset-md-2 mb-5">
            <SearchForm searchFor={search} />
            {listings.length
                ? (
                    <div className="Listings-list row justify-content-center">
                        {listings.map(l => (
                            <ListingCard
                                key={l.id}
                                id={l.id}
                                name={l.name}
                                city={l.city}
                                state={l.state}
                                country={l.country}
                                photoUrls={l.photoUrls}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default Listings;