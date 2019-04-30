
import React from 'react';
import { Redirect } from "react-router-dom";
import * as FB from '../firebase/Auth';

export default class SearchResultsPage extends React.Component {

    render() {
        if( ! FB.isAuthenticated()) {
            // Can reach here through bookmark.
            return <Redirect to="/" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>SEARCH RESULTS PAGE</h1>
                    </header>
                    <div className="row">
                        <p>TODO: Fill out this page.</p>
                        <p>Tried to search for {`${this.props.match.params.query}`}</p>
                    </div>
                </div>
            );
        }
    }

}
