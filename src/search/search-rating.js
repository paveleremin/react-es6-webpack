import React from 'react';

let SearchRating = React.createClass({

    componentWillMount() {
        let item = this.props.item;
        // help to JS compiler and improve speed
        this.stars = new Array(Math.ceil(item.rating) || 1);
        if (!item.rating) {
            this.stars[0] = 'fa-star-o';
        }

        let i = 0;
        for (let n = Math.floor(item.rating); i < n; i++) {
            this.stars[i] = 'fa-star';
        }
        if (item.rating > i) {
            this.stars[i+1] = 'fa-star-half-o';
        }
    },

    render (){
        return (
            <div title={`Rating: ${this.props.item.rating}`}>
                { this.stars.map((className, i) =>
                    <i className={`fa ${className}`} key={i}></i>
                )}
            </div>
        );
    }
});

export default SearchRating;
