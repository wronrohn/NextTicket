
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as FB from '../firebase/Auth';
import ErrorPage from './ErrorPage';
import RecommendationsPage from './RecommendataionsPage';
import SignInPage from './SignInPage';
import CreateAccountPage from './CreateAccountPage';
import RecoverAccountPage from './RecoverAccountPage';
import WatchlistPage from './WatchlistPage';
import SearchResultsPage from './SearchResultsPage';

/**
 * Main entrypoint for the client-side applicaiton. This is the landing page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this._syncStateWithAuthUser = this._syncStateWithAuthUser.bind(this);
        this._stateFactory = this._stateFactory.bind(this);
        this.state = this._stateFactory();
    }

    componentDidMount() {
        FB.AUTH.onAuthStateChanged(this._syncStateWithAuthUser);
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path="/"               component={SignInPage} />
                        <Route exact path="/recommendations"component={RecommendationsPage} />
                        <Route exact path="/create"         component={CreateAccountPage} />
                        <Route exact path="/recover"        component={RecoverAccountPage} />
                        <Route exact path="/watchlist"      component={WatchlistPage} />
                        <Route exact path="/search"         component={SearchResultsPage} />
                        <Route path="/404"                  component={ErrorPage} />
                        <Route path="*"                     component={ErrorPage} />
                    </Switch>
                    {/* <div>
                        TODO: Add a modal for movie info.
                    </div> */}
                </div>
            </Router>
        );
    }

    _syncStateWithAuthUser(newUser) {
        if(newUser) {
            this.setState( this._stateFactory(
                newUser.email,
                newUser.uid,
                newUser.displayName,
                newUser.metadata.lastLoginTime
            ));
        }
        else {
            this.setState( this._stateFactory() );
        }
    }

    /**
     * Mirrors a user authenticated through firebase.
     */
    _stateFactory(email, uid, name, lastLoginTime) {
        if( ! (email && uid && name && lastLoginTime)) {
            return ( {
                email: null,
                uid: null,
                name: null,
                lastLoginTime: null
            } );
        }
        else if(email && uid && name && lastLoginTime) {
            return ( {
                email: email,
                uid: uid,
                name: name,
                lastLoginTime: lastLoginTime
            } );
        }
        else {
            throw new Error("Incomplete user information.");
        }
    }

}
