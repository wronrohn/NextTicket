
import React from "react";
import { withFirebase } from "../../Firebase";

class SignOutButton extends React.Component {

    render() {
        return(
            <button className={this.props.className}
                    type="button"
                    onClick={this.props.firebase.signOut}
            >
                Sign Out
            </button>
        );
    }
}

export default withFirebase(SignOutButton);
