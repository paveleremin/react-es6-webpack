import React from 'react';
import {Link} from 'react-router';

import CustomLink from './header-custom-link.js';
import {Cart} from './../services/resources.js';

let HeaderWithLogin = React.createClass({

    getInitialState() {
        return {
            itemsCount: Cart.size()
        };
    },

    changeItems(e) {
        this.setState({itemsCount: e.detail});
    },

    componentDidMount() {
        document.addEventListener('header:items', this.changeItems);
    },

    componentWillUnmount() {
        document.removeEventListener('header:items', this.changeItems);
    },

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
                        <ul className="nav navbar-nav">
                            <CustomLink to="search">
                                Search
                            </CustomLink>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="javascrip:void(0)">
                                    Cart: {this.state.itemsCount} items
                                </a>
                            </li>
                            <CustomLink to="logout">
                                <i className="fa fa-sign-out"></i>
                                Log Out
                            </CustomLink>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default HeaderWithLogin;
