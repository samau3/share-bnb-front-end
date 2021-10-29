import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "./UserContext";
import Alert from "./Alert";

const INITIAL_LOGIN_FORM = {
  username: "",
  password: "",
}


/** Login form.
 *
 *  Shows form and manages update to state on changes.
 *  On submission:
 *  - calls login function prop
 *
 *  Routed as /login
 * 
 *  Props:
 *  - handleLogin: a function to be called in parent
 * 
 *  State:
 *  - formData: inputs from the form
 *  - formErrors: error messages from form submission
 * 
 *  Routes -> LoginForm -> Alert
 */

function LoginForm({ handleLogin }) {
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState(INITIAL_LOGIN_FORM);
  const currentUser = useContext(UserContext);

  if (currentUser) return <Redirect to="/" />

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors,
  );

  /** Handle form submit. Calls login prop function
   *
   *  If not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleLogin(formData);
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

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
                  autoComplete="username"
                  required
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
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

              <div className="d-grid">
                <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
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

export default LoginForm;
