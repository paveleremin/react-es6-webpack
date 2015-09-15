import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import './_styles/styles.less';

import Header from './header/header.js';
import Footer from './footer/footer.js';
import Signup from './signup/signup.js';
import Login from './login/login.js';
import Logout from './login/logout.js';
import Search from './search/search.js';
import CurrentUser from './services/current-user.js';

require('file?name=[name].[ext]!./../index.html');
require('file?name=[name].[ext]!./../favicon.ico');

let App = React.createClass({
    render: function(){
        return (
            <div id="root">
                <div id="page">
                    <Header/>
                    <div id="content" className="container">
                        <RouteHandler/>
                    </div>
                </div>
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
});

// PROCESS SECURE ROUTES
const redirectOrRender = function (fn, Component, redirectState = 'login'){
    return React.createClass({
        statics: {
            willTransitionTo(transition, currentParams, currentQuery) {
                if (!fn(currentParams, currentQuery)) {
                    transition.redirect(redirectState);
                }
            }
        },
        render() {
            return <Component {...this.props}/>;
        },
        displayName: `${Component.displayName}(Guarded)`
    });
};
const securePath = redirectOrRender.bind(this, () => CurrentUser.isLoggedIn());

// LIST OF ROUTES
let routes = (
    <Route handler={App}>
        <Route name="login" path="/" handler={Login}/>
        <Route name="logout" path="/logout" handler={securePath(Logout)}/>
        <Route name="signup" path="signup" handler={Signup}/>
        <Route name="search" path="search" handler={securePath(Search)}/>
    </Route>
);
Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});
