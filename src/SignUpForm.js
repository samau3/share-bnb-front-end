import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext";

import Alert from "./Alert";

const INITIAL_SIGNUP_FORM = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

/** Signup form.
 * 
 *  Routed as /signup
 * 
 *  Props:
 *  - handleSignUp: function to be called in App
 * 
 *  State:
 *  - formData: form inputs
 *  - formErrors: error messages from submitting form
 *
 *  Routes -> SignupForm -> Alert
 */

function SignUpForm({ handleSignUp }) {
  const [formData, setFormData] = useState(INITIAL_SIGNUP_FORM);
  const [formErrors, setFormErrors] = useState([]);

  const currentUser = useContext(UserContext);
  if (currentUser) return <Redirect to="/" />

  console.debug(
    "SignUpForm",
    "handleSignUp=", typeof handleSignUp,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls handleSignUp func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSignUp(formData);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignUpForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control form-control-sm"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">First name</label>
                <input
                  name="firstName"
                  className="form-control form-control-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last name</label>
                <input
                  name="lastName"
                  className="form-control form-control-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              }

              <div className="d-grid">
                <button className="btn btn-sm btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;