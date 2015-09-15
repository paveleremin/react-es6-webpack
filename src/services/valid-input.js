import React from 'react';
import Formsy from 'formsy-react';

let ValidInput = React.createClass({

    // add the Formsy Mixin
    mixins: [Formsy.Mixin],

    componentDidMount() {
        var props = this.props;
        if (!props.autofocus) return;
        this.refs[props.name].getDOMNode().focus();
    },

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {

        let inputWrapperClasses = 'form-group';
        if (!this.isValid() && !this.isPristine()) {
            inputWrapperClasses += ' has-error';
        }

        return (
            <div className={inputWrapperClasses}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <input
                    id={this.props.name}
                    className="form-control"
                    type={this.props.type || 'text'}
                    ref={this.props.name}
                    name={this.props.name}
                    onChange={this.changeValue}
                    value={this.getValue()}/>
            </div>
        );
    }
});

export default ValidInput;
