import React, { useState } from "react";
// import "./SearchForm.css";

/** Search form.
 *
 * Appears on Listings so that these can be filtered down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 * 
 * Props:
 * - searchFor: function to be called in parent
 * 
 * State:
 * - searchTerms: possible criteria to search for
 *  { name, city, state, country }
 *
 * Listing -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    city: "",
    state: "",
    country: ""
  });

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerms);
    setSearchTerms(searchTerms);
  }

  /** Update form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setSearchTerms(st => ({
      ...st,
      [name]: value,
    }));
    console.log("SearchForm handlechange", { searchTerms })
  }

  return (
    <div className="SearchForm mb-4 row justify-content-center">
      <form onSubmit={handleSubmit} className="col-8">
        <div className="justify-content-center justify-content-lg-start gx-0">
          <input
            className="form-control form-control-sm bg-white mb-1"
            name="name"
            placeholder="Search for Name"
            value={searchTerms.name}
            onChange={handleChange}
          />
          <input
            className="form-control form-control-sm bg-white mb-1"
            name="city"
            placeholder="Search for City"
            value={searchTerms.city}
            onChange={handleChange}
          />
          <input
            className="form-control form-control-sm bg-white mb-1"
            name="state"
            placeholder="Search for State"
            value={searchTerms.state}
            onChange={handleChange}
          />
          <input
            className="form-control form-control-sm bg-white mb-1"
            name="country"
            placeholder="Search for Country"
            value={searchTerms.country}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-sm btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
