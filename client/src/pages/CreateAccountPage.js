
import React from 'react';
import { Redirect } from "react-router-dom";
import * as FB from '../firebase/Auth';

export default class CreateAccountPage extends React.Component {

    render() {
        if(FB.isAuthenticated()) {
            // Already authenticated. No reason to create an account now.
            return <Redirect to="/" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>CREATE ACCOUNT PAGE</h1>
                    </header>
                    <div className="row">
                        <p>TODO: Fill out this page.</p>
                    </div>
                </div>
            );
        }
    }

}
