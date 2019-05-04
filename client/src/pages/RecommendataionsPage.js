
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as FB from '../firebase/Auth';
import Search from '../components/Search';

export default class RecommendationsPage extends React.Component {

    render() {
        if( ! FB.isAuthenticated()) {
            // May end up here through bookmark.
            return <Redirect to="/" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>Your Recommendations</h1>
                    </header>
                    <div className="row">
                        <Link to="/watchlist">Watchlist</Link>
                        <Search />
                    </div>
                </div>
            );
        }
    }

}
