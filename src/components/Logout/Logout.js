import React from 'react';
import {Link} from 'react-router-dom';

const Logout = () => {
    return(
        <div>
            <h4>You Have Logged Out </h4>
            <Link to="/login">Login Here</Link>
        </div>
    )
}
export default Logout;