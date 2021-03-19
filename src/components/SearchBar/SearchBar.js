import React, { Component } from 'react';
import "./SearchBar.css";

const zips = require("../../modules/mo_zipcodes.json");

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
        
        }
    }
    
    componentDidMount() {
        
    }
    
    render() {
    
        return(
            <form className= "search-bar">
                <div className= "search-inputs-wrapper">
                    <div className= "zip-wrapper">
                        <label className= "zip-label" htmlFor="zip">Search Near:</label>
                        <input type="text" id="zip" name="zip" placeholder="5 digit zipcode" />
                    </div>
                    <div className= "distance-wrapper">
                        <label className= "distance-label" htmlFor="distance">Within:</label>
                        <select type="" id="distance" name="distance" defaultValue="">
                            <option value="5">5 miles</option>
                            <option value="10">10 miles</option>
                            <option value="25">25 miles</option>
                            <option value="50">50 miles</option>
                            <option value="">Any Distance</option>
                        </select>
                    </div>
                </div>
            </form>
        
        )
    }
}
export default SearchBar;
