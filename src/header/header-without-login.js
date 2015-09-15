import React from 'react';
import {Link} from 'react-router';
import CustomLink from './header-custom-link.js';

let HearWithoutLogin = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="login">
                            Test app
                        </Link>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <CustomLink to="login">
                                <i className="fa fa-sign-in"></i>
                                Sign In
                            </CustomLink>
                            <CustomLink to="signup" activeClassName="active">
                                <i className="fa fa-user-plus"></i>
                                Sign Up
                            </CustomLink>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default HearWithoutLogin;
