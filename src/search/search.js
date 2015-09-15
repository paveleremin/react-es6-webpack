import React from 'react';
import pluck from 'lodash/collection/pluck';
import uniq from 'lodash/array/uniq';

import SearchRating from './search-rating.js';
import {Cart, Item} from '../services/resources.js';

let Search = React.createClass({

    getInitialState() {
        return {
            filter: {
                issueFrom: '',
                issueTo: '',
                inStock: false,
                priceFrom: '',
                priceTo: '',
                color: ''
            },
            colors: [],
            filteredItems: []
        };
    },

    itemsFilterFn(item) {
        let filter = this.state.filter;

        if (filter.inStock && !item.inStock) {
            return false;
        }
        if (filter.color && filter.color != item.color) {
            return false;
        }
        if (filter.priceFrom && item.price < filter.priceFrom) {
            return false;
        }
        if (filter.priceTo && item.price > filter.priceTo) {
            return false;
        }
        if (filter.issueFrom && item.issue < filter.issueFrom) {
            return false;
        }
        if (filter.issueTo && item.issue > filter.issueTo) {
            return false;
        }

        return true;
    },

    onFilterChange(filterName, e) {
        let filter = this.state.filter;
        filter[filterName] = filterName == 'inStock'
            ? e.target.checked
            : e.target.value;
        this.setState({
            filter: filter,
            filteredItems: this.items.filter((item) => this.itemsFilterFn(item))
        });
    },

    addToCart(item) {
        Cart.add(item);
        let event = new CustomEvent('header:items', {
            detail: Cart.size()
        });
        document.dispatchEvent(event);
    },

    componentDidMount() {
        this.items = [];
        Item.all().then((items) =>{
            this.items = items;
            this.setState({
                filteredItems: items,
                colors: uniq(pluck(items, 'color'))
            });
        });
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="issueFrom">Issue from:</label>
                        <label htmlFor="issueFrom" className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </span>
                            <input
                                id="issueFrom"
                                onChange={this.onFilterChange.bind(this, 'issueFrom')}
                                className="form-control"
                                placeholder="2015-02-01"
                                type="text"/>
                        </label>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="issueTo">Issue to:</label>
                        <label htmlFor="issueTo" className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </span>
                            <input
                                id="issueTo"
                                onChange={this.onFilterChange.bind(this, 'issueTo')}
                                className="form-control"
                                placeholder="2015-02-06"
                                type="text"/>
                        </label>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="inStock">In stock only:</label>
                        <div>
                            <input
                                id="inStock"
                                onChange={this.onFilterChange.bind(this, 'inStock')}
                                type="checkbox"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="priceFrom">Price from:</label>
                        <div>
                            <input
                                id="priceFrom"
                                onChange={this.onFilterChange.bind(this, 'priceFrom')}
                                className="form-control"
                                type="text"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="priceTo">Price to:</label>
                        <div>
                            <input
                                id="priceTo"
                                onChange={this.onFilterChange.bind(this, 'priceTo')}
                                className="form-control"
                                type="text"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="color">Color:</label>
                        <div>
                            <select
                                id="color"
                                onChange={this.onFilterChange.bind(this, 'color')}
                                className="form-control">
                                <option value="">- Any -</option>
                                { this.state.colors.map((color, i) =>
                                    <option
                                        style={{color: color}}
                                        value={color}
                                        key={i}>{color}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <hr/>

                { !this.state.filteredItems.length &&
                    <div className="search-loader">
                        <i className="fa fa-5x fa-refresh fa-spin"></i>
                    </div>
                }

                { this.state.filteredItems.map(item =>
                    <div className="row item" key={item.id}>
                        <div className="col-xs-3">
                            <img
                                className="img-responsive"
                                src={item.image}
                                alt=""/>
                        </div>

                        <div className="col-xs-9">
                            <div className="row">
                                <div className="col-xs-4">
                                    {item.name}
                                </div>
                                <div className="col-xs-4">
                                    {item.issue}
                                </div>
                                <div className="col-xs-4">
                                    ${item.price}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <span style={{color:item.color}}>
                                        {item.color}
                                    </span>
                                </div>
                                <div className="col-xs-4">
                                    {item.inStock?'In stock':'Not in stock'}
                                </div>
                                <div className="col-xs-4">
                                    <button
                                        onClick={this.addToCart.bind(this,item)}
                                        className="btn btn-primary"
                                        type="button">
                                        Order
                                    </button>
                                </div>
                            </div>
                            <SearchRating item={item}></SearchRating>
                        </div>
                    </div>
                )}
            </div>
        );
    }
});

export default Search;
