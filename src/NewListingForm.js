import React, { useState, useContext } from "react";
import axios from "axios";
// import Alert from "../common/Alert";
// import JoblyApi from "../api/api";
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
  const [formData, setFormData] = useState(null);
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
    console.log("NewListingForm handlechange evt tar", evt.target.value)
    const { name, value } = evt.target;

    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    console.log("NewListingForm handlechange", { formData })

    setFormErrors([]);
  }

  async function handlePhotoUpload(evt) {
    evt.preventDefault();
    const file = formData.imageInput.current.files[0];

    // const { url }

    await axios({
      "method": "put",
      "headers": {
        "Content-Type": "multipart/form-data"
      },
      "body": file,
    })
  }

  return (
    <div className="NewListingForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Add a New Listing</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="imageInput" className="form-label">Username</label>
              <input
                id="imageInput"
                name="image"
                type="file"
                accept="image/*"
                className="form-control"
                placeholder="Add a Photo"
                onChange={handleChange}
              />
              <button className="btn btn-primary" onClick={handlePhotoUpload}>Save Photo</button>
            </div>
            {/* <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            {saveConfirmed
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null} */}

            {/* <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Add Photo
              </button>
            </div> */}

          </form>
        </div>
      </div>
    </div>
  );
}

export default NewListingForm;
