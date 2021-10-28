import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import ShareBnbApi from "./Api";
import Alert from "./Alert";
// import UserContext from "../auth/UserContext";
// import "./ProfileForm.css"

// eslint-disable-next-line
// import useTimedMessage from "../hooks/useTimedMessage";

const INITIAL_FORM_DATA = {
  name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    description: "",
    photoUrl: ""
}

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function NewListingForm({ initalFormData=INITIAL_FORM_DATA }) {
  //   const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initalFormData);
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  // const [formSubmitted, setFormSubmitted] = useState(false);
  console.log("NewListingForm", { formData, image, formErrors })

  // useEffect(function resetFormSubmitted() {
  //   setFormSubmitted(false);
  // }, []);


  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    // console.log("NewListingForm handlechange", { formData })
    setFormErrors([]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();

    data.append('file', image);
    console.log('handleSubmit data', data.get('file'))

    // looping through the formData to update data with the
    // key, value pairs (ex. name: name)
    for (let obj in formData) {
      data.append(obj, formData[obj]);
    }

    try {
      const result = await ShareBnbApi.uploadNewListing(data);
      // setFormSubmitted(true);
      console.log('handleSubmit axios', result)
      return <Redirect to="listings" />
    } catch (err) {
      console.log(err);
      setFormErrors(err);
    }
  }

  function handlePhoto(evt) {
    setImage(evt.target.files[0]);
    // console.log("evt.target.file", evt.target.files[0]);
  }

  return (
    <div className="NewListingForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Add a New Listing</h3>
      <div className="card">
        <div className="card-body">
          <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="photoInput" className="form-label">Photo</label>
              <input
                id="photoInput"
                name="photoUrl"
                type="file"
                accept="image/*"
                className="form-control"
                placeholder="Add a Photo"
                onChange={handlePhoto}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                name="street"
                className="form-control"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="textarea"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            {/* {saveConfirmed
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null} */}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
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
