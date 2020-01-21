import React from "react";
import { Link } from "react-router-dom";

function UserProfile() {
  return (
    <React.Fragment>
      <aside>
        <h3>Logo</h3>
        <ul>
          <Link to="/newslist">
            <li>News</li>
          </Link>
          <Link to="/eventslist">
            <li>Events</li>
          </Link>
          <Link to="/userprofile">
            <li>Profile</li>
          </Link>
        </ul>
      </aside>
      <div>
        <h1>Profile information</h1>
        <form>
          <div className="userFirstName">
            <label>
              First Name:
              <input type="text" name="name" />
            </label>
          </div>
          <div className="userLastname">
            <label>
              Last Name:
              <input type="text" name="lastname" />
            </label>
          </div>
          <div className="userEmail">
            <label>
              Email:
              <input type="email" name="email" />
            </label>
          </div>
          <div className="userAge">
            <label>
              Age:
              <input type="number" name="age" />
            </label>
          </div>

          <div className="userGender">
            <label htmlFor="gender">
              Male
              <input type="radio" name="gender" value="male" />
            </label>
            <label htmlFor="gender">
              {" "}
              Female
              <input type="radio" name="gender" value="female" />
            </label>
          </div>

          <button>Change password</button>
        </form>
      </div>
    </React.Fragment>
  );
}

/*comment for git */

export default UserProfile;
