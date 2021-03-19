import React, { Component } from 'react';
import "./SearchBar.css";

//~ const zips = require("../../modules/mo_zipcodes.json");

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
                <div className= "search-inputs">
                    <div className= "text-inputs">
                        <div className= "input-wrapper zip-wrapper">
                            <label className= "search-label zip-label" htmlFor="zip">Search Near:</label>
                            <br/>
                            <input type="text" id="zip" className="input-text" name="zip" placeholder="5 digit zip" />
                        </div>
                        <div className= "input-wrapper distance-wrapper">
                            <label className= "search-label distance-label" htmlFor="distance">Within:</label>
                            <br />
                            <select type="" id="distance" name="distance" defaultValue="" className="input-text">
                                <option value="5">5 miles</option>
                                <option value="10">10 miles</option>
                                <option value="25">25 miles</option>
                                <option value="50">50 miles</option>
                                <option value="">Any Distance</option>
                            </select>
                        </div>
                    </div>
                    <div className= "no-vaccine-checkbox">
                        <input type="checkbox" id="no-vaccine" value="no-vaccine"/>
                        <label htmlFor="no-vaccine" className="no-vaccine-label">Show results with no vaccine</label>
                    </div>
                </div>
                <div className="submit-wrapper">
                    <input id="search-btn" type="submit" value= "SEARCH"/>
                </div>
            </form>
        
        )
    }
}
export default SearchBar;
