import React from 'react';
import {Navigation} from 'react-router';

import CurrentUser from '../services/current-user.js';
import {Cart} from '../services/resources.js';

let Logout = React.createClass({

    mixins: [Navigation],

    componentWillMount() {
        CurrentUser.remove();
        Cart.clear();
        this.transitionTo('login');
    },

    render() {
        return <div/>;
    }

});

export default Logout;
