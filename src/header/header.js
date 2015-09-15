import React from 'react';
import {Link} from 'react-router';

import CurrentUser from './../services/current-user.js';
import HeaderWithoutLogin from './header-without-login.js';
import HeaderWithLogin from './header-with-login.js';

let Header = React.createClass({
    render() {
        if (CurrentUser.isLoggedIn()) {
            return <HeaderWithLogin/>;
        }
        return <HeaderWithoutLogin/>;
    }
});

export default Header;
