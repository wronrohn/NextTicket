
import React from 'react';
import { Redirect } from "react-router-dom";
import * as FB from '../firebase/Auth';

export default class RecoverAccountPage extends React.Component {

    render() {
        if(FB.isAuthenticated()) {
            // Already authenticated. No reason to recover an account now.
            return <Redirect to="/" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>RECOVER ACCOUNT PAGE</h1>
                    </header>
                    <div className="row">
                        <p>TODO: Fill out this page.</p>
                    </div>
                </div>
            );
        }
    }

}
