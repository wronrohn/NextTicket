
import React from 'react';
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import SignOutButton from "./Signout";
import * as ROUTES from "../constants/routes";

/**
 * The user profile page.
 */
class UserProfile extends React.Component {

    render() {
        let userEmail = this.props.firebase.auth.currentUser.email;
        let cmpUserEmail = (
            <div>
                <h2>Email: {`${userEmail}`}</h2>
            </div>
        );
        let userName = this.props.firebase.auth.currentUser.displayName;
        let cmpUserName = (
            <div className="row mt-1 mb-5">
                <h2>Display Name: {`${userName}`}</h2>;
            </div>
        );

        return (
            <div className="mb-5 mt-5 container">
                <div>
                    <div className="text-white center-content">
                        <div>
                            <h1>User Profile</h1>
                        </div>

                        { userName && cmpUserName }
                        { userEmail && cmpUserEmail }

                        <div className="pad-10">
                            <div className="">
                                <Link className="btn btn-primary button-update-pass"
                                      to={ROUTES.CHANGE_PASSWORD}
                                >
                                    Update Password
                                </Link>
                            </div>
                        </div>

                        <div className="">
                            <div className="">
                                <SignOutButton className="btn btn-dark button-sign-out" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default withAuthorization()(withFirebase(UserProfile));
