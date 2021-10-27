import React, { useState } from "react";
import axios from "axios";
// import Alert from "../common/Alert";
// import ShareBnbApi from "./Api";
// import UserContext from "../auth/UserContext";
// import "./ProfileForm.css"

// eslint-disable-next-line
// import useTimedMessage from "../hooks/useTimedMessage";

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

function NewListingForm() {
  //   const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    description: "",
    photoUrl: ""
  });
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  console.log("NewListingForm", { formData })
  // switch to use our fancy limited-time-display message hook
  //   const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  //   console.debug(
  //     "NewListingForm",
  //     "currentUser=", currentUser,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  //     "saveConfirmed=", saveConfirmed,
  //   );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  //   async function handleSubmit(evt) {
  //     evt.preventDefault();

  //     let profileData = {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       email: formData.email,
  //     };

  //     let username = formData.username;
  //     let updatedUser;

  //     try {
  //       updatedUser = await JoblyApi.saveProfile(username, profileData);
  //     } catch (errors) {
  //       setFormErrors(errors);
  //       return;
  //     }

  //     setFormData(f => ({ ...f }));
  //     setFormErrors([]);
  //     setSaveConfirmed(true);

  //     // trigger reloading of user information throughout the site
  //     setCurrentUser(updatedUser);
  //   }

  /** Handle form data changing */
  function handleChange(evt) {
    // console.log("NewListingForm handlechange evt tar", evt.target.value)
    // console.log("NewListingForm evt.target", evt.target.files[0]);
    const { name, value } = evt.target;

    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    console.log("NewListingForm handlechange", { formData })

    setFormErrors([]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    // console.log('handleSuvmit image', image)
    data.append('file', image);
    console.log('handleSubmit data', data.get('file'))
    data.append('formDataState', formData)
    // const obj = {
    //   ...formData
    // }
    // obj.file = data;
    try {
      // await ShareBnbApi.uploadNewListings(image);
      const result = await axios.post("http://localhost:3001/listings/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log('handleSubmit axios', result)
    } catch (err) {
      console.log(err);
      setFormErrors(err);
    }

  }

  function handlePhotoUpload(evt) {
    evt.preventDefault();
    console.log("handlePhotoUpload evt.target", evt.target.parentElement.querySelector("#photoInput").files[0]);

    setImage(evt.target.parentElement.querySelector("#photoInput").files[0]);
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
                onChange={handleChange}
              />
              <button className="btn btn-primary" onClick={handlePhotoUpload}>Save Photo</button>
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                name="street"
                className="form-control"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
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
              />
            </div>

            {/* {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            {saveConfirmed
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
