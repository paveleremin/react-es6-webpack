import React from 'react';
import {Link} from 'react-router';

class CustomLink extends Link {
    render(){
        let className = null,
            props = this.props;
        if (this.context.router.isActive(props.to, props.params, props.all)) {
            className = props.activeClassName;
        }
        return (
            <li className={className}>
                {super.render()}
            </li>
        );
    }
}

// how to extend component with ES5
//let CustomLink = Link;
//let originRender = Link.prototype.render;
//CustomLink.prototype.render = function (){
//    let className = null,
//        props = this.props;
//    if (this.context.router.isActive(props.to, props.params, props.all)) {
//        className = props.activeClassName;
//    }
//    return (
//        <li className={className}>
//            {originRender.apply(this)}
//        </li>
//    );
//};

export default CustomLink;
