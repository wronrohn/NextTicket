
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

        console.log(this.props.firebase.auth.currentUser);

        let userEmail = this.props.firebase.auth.currentUser.email;
        let cmpUserEmail = (
            <div className="row mt-1">
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
                <div style={{ boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)" }}>
                    <div className="col card mt-4">
                        <div className="row">
                            <h1>User Profile</h1>
                        </div>

                        { userName && cmpUserName }
                        { userEmail && cmpUserEmail }

                        <div className="row mt-5">
                            <div className="col-2 ">
                                <Link className="btn btn-dark button-update-pass w-100"
                                      to={ROUTES.CHANGE_PASSWORD}
                                >
                                    Update Password
                                </Link>
                            </div>
                        </div>

                        <div className="row mt-1">
                            <div className="col-2">
                                <SignOutButton className="btn btn-dark button-sign-out w-100" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default withAuthorization()(withFirebase(UserProfile));
