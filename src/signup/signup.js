import React from 'react';
import {Link, Navigation} from 'react-router';
import Store from 'store';
import Formsy from 'formsy-react';

import ValidInput from '../services/valid-input.js';
import Hash from '../services/hash.js';
import CurrentUser from '../services/current-user.js';
import {User} from '../services/resources.js';

let Signup = React.createClass({

    mixins: [Navigation],

    getInitialState() {
        return {
            error: '',
            formValid: false,
            isLoading: false
        };
    },

    onSubmit(data) {

        this.setState({
            error: '',
            isLoading: true
        });

        // imitation of the delay from the server
        // using setTimeout function
        setTimeout(() => {
            let user = User.findByEmail(data.email);

            if (user) {
                this.setState({
                    error: `Email ${data.email} already in use`,
                    isLoading: false
                });
                return;
            }

            data.password = Hash(data.password);
            User.add(data);
            CurrentUser.set(data);
            this.transitionTo('search');
        }, 1000);

    },

    togleButton(state) {
        this.setState({formValid: state});
    },

    render() {
        let errorClasses = 'fade';
        if (this.state.error.length) {
            errorClasses += ' in';
        }

        let submitClasses = 'btn btn-primary btn-block with-loader';
        if (this.state.isLoading) {
            submitClasses += ' loading';
        }

        return (
            <div className="row">
                <div className="col-md-offset-4 col-md-4">

                    <div className={errorClasses}>
                        <div className="alert alert-danger">{ this.state.error || '-' }</div>
                    </div>

                    <Formsy.Form
                        onValidSubmit={this.onSubmit}
                        onValid={this.togleButton.bind(this, true)}
                        onInvalid={this.togleButton.bind(this, false)}>
                        <ValidInput
                            autofocus
                            title="Email"
                            name="email"
                            validations="isEmail"
                            required/>
                        <ValidInput
                            title="Password"
                            name="password"
                            validations="minLength:3"
                            type="password"
                            required/>
                        <ValidInput
                            title="Confirm password"
                            name="password_confirm"
                            validations="equalsField:password"
                            type="password"
                            required/>
                        <button
                            disabled={!this.state.formValid||this.state.isLoading}
                            className={submitClasses}
                            type="submit">
                            <i className="fa fa-refresh fa-spin"></i>
                            <span>Sign Up</span>
                        </button>
                    </Formsy.Form>

                    <div className="line-or">
                        <hr/>
                        <div>or</div>
                    </div>

                    <Link to="login" className="btn btn-link btn-block">
                        Sign In
                    </Link>

                </div>
            </div>
        );
    }
});

export default Signup;
