
import React from 'react';

/**
 * A small component for signing in.
 */
export default class SignIn extends React.Component {

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" onChange={this.props.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={this.props.handleChange}/>
                    </label>
                    <label>
                        <input type="submit" value="Sign In" />
                    </label>
                </form>
            </div>
        );
    }

}
