
import React from 'react';
import { Link, Redirect } from "react-router-dom";
import * as FB from '../firebase/Auth';
import Watchlist from '../components/Watchlist';

export default class WatchlistPage extends React.Component {

    render() {
        if( ! FB.isAuthenticated()) {
            // Can reach here through bookmark.
            return <Redirect to="/" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>WATCHLIST PAGE</h1>
                    </header>
                    <div className="row">
                        <Link to="/recommendations">Recommendations</Link>
                    </div>
                    <div className="row">
                        <Watchlist />
                    </div>
                </div>
            );
        }
    }

}
