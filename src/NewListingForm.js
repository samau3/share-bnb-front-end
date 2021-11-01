import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import ShareBnbApi from "./Api";
import Alert from "./Alert";

import UserContext from "./UserContext";



/** Create a new listing.
 *
 *  Props:
 *  - None
 * 
 *  State:
 *  - formData: inputs from the form
 *  - formErrors: error messages from form submission
 *  - formSubmitted: true/false
 *  - images: an array of photos uploaded by the user
 *
 *  Events:
 *  - handleChange: changes in form input fields
 *  - handleSubmit: sends form data to API to update database and 
 *                  updates formSubmitted state
 *  - handlePhoto: updates images state with uploaded photos
 * 
 *  Routes -> NewListingForm -> Alert
 */

function NewListingForm() {
  const currentUser = useContext(UserContext);

  const INITIAL_NEW_LISTING_FORM = {
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    description: "",
    photoUrls: "",
    price: 0,
    username: currentUser.username,
  }

  const [formData, setFormData] = useState(INITIAL_NEW_LISTING_FORM);
  const [formErrors, setFormErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  console.log("NewListingForm", { formData, images, formErrors, currentUser })



  /** Resets form submitted state when component mounts */
  useEffect(function resetFormSubmitted() {
    setFormSubmitted(false);
  }, []);

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();

    for (let image of images) {
      // Append allows you to add the same key with a different value
      data.append('file', image); // {file: image}, {file, image}, {file, image}
    }

    // updates data object with the entry ex. {name: "Private Backyard"}
    for (let obj in formData) {
      data.append(obj, formData[obj]);
    }

    try {
      await ShareBnbApi.uploadNewListing(data);
      setFormSubmitted(true);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** adds files to images state when the photos have been uploaded */
  function handlePhoto(evt) {
    setImages(evt.target.files);
  }

  if (formSubmitted) {
    return <Redirect to="/listings" />
  }

  return (
    <div className="NewListingForm col-sm-8 offset-sm-2 mt-5">
      <h3>Add a New Listing</h3>
      <div className="card my-5">
        <div className="card-body">
          <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-2">
              <label htmlFor="photoInput" className="form-label">Photo (max 3)</label>
              <input
                id="photoInput"
                name="photoUrls"
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                placeholder="Add a Photo"
                onChange={handlePhoto}
                multiple
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control form-control-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Street</label>
              <input
                name="street"
                className="form-control form-control-sm"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">City</label>
              <input
                name="city"
                className="form-control form-control-sm"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">State</label>
              <input
                name="state"
                className="form-control form-control-sm"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Country</label>
              <input
                name="country"
                className="form-control form-control-sm"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <input
                type="textarea"
                name="description"
                className="form-control form-control-sm"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Price</label>
              <input
                name="price"
                className="form-control form-control-sm"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <input
                name="username"
                className=""
                value={currentUser.username}
                onChange={handleChange}
                hidden
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            <div className="d-grid">
              <button type="submit" className="btn btn-sm btn-primary">
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewListingForm;
