
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as FB from '../firebase/Auth';
import SignIn from '../components/SignIn';

export default class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value } )
    }

    handleSubmit(event) {
        event.preventDefault();
        FB.doSignInWithEmailAndPassword(this.state.username, this.state.password);
        this.forceUpdate();
    }

    render() {
        console.log('render');
        if(FB.isAuthenticated()) {
            // May end up here after clicking log in.
            return <Redirect to="/recommendations" />
        }
        else {
            return(
                <div className="container-fluid">
                    <header className="row">
                        <h1>SIGN IN</h1>
                    </header>
                    <div className="row">
                        <SignIn handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    </div>
                    <div className="row">
                        <Link to="/create">Create Account</Link>
                        <Link to="/recover">Forgot Password</Link>
                    </div>
                </div>
            );
        }
    }

}
