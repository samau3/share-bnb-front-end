import React, { useState } from "react";
// import "./SearchForm.css";

/** Search widget.
 *
 * Appears on Listings so that these can be filtered down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * Listing -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const [formErrors, setFormErrors] = useState([]);

  const [searchTerms, setSearchTerms] = useState({
    name: "",
    city: "",
    state: "",
    country: ""
  });

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerms);
    setSearchTerms(searchTerms);
    console.log("Ran Search");
  }

  /** Update form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setSearchTerms(st => ({
      ...st,
      [name]: value,
    }));
    console.log("SearchForm handlechange", { searchTerms })

    setFormErrors([]);
  }

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-0">
          <div className="col-8">
            <input
              className="form-control form-control-lg"
              name="name"
              placeholder="Search for Name"
              value={searchTerms.name}
              onChange={handleChange}
            />
            <input
              className="form-control form-control-lg"
              name="city"
              placeholder="Search for City"
              value={searchTerms.city}
              onChange={handleChange}
            />
            <input
              className="form-control form-control-lg"
              name="state"
              placeholder="Search for State"
              value={searchTerms.state}
              onChange={handleChange}
            />
            <input
              className="form-control form-control-lg"
              name="country"
              placeholder="Search for Country"
              value={searchTerms.country}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
