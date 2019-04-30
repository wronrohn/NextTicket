
import React from 'react';

/**
 * A search widget component.
 */
export default class Search extends React.Component {

    render() {
        return(
            <div>
                <form action="/search">
                    <input type="text" placeholder="Search.." name="search" />
                    <button type="submit">go</button>
                </form>
            </div>
        );
    }

}
