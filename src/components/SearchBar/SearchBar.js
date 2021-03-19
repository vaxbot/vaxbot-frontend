import React, { Component } from 'react';
import "./SearchBar.css";

//~ const zips = require("../../modules/mo_zipcodes.json");

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            distance: "any",
            zip: "",
            show_unavailable: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    
    componentDidMount() {
        
    }
    
    handleSubmit(event) {
        alert("submit!");
        event.preventDefault();
    }
    
    handleSelect(event) {
        this.setState({distance: event.target.value});

    }
    
    handleInput(event) {
        this.setState({zip: event.target.value});

    }
    
    handleCheckbox(event) {
        this.setState({show_unavailable: event.target.checked});
 
    }
    
    render() {
    
        return(
            <form className= "search-bar">
                <div className= "search-inputs">
                    <div className= "text-inputs">
                        <div className= "input-wrapper zip-wrapper">
                            <label className= "search-label zip-label" htmlFor="zip">Search Near:</label>
                            <br/>
                            <input type="text" id="zip" className="input-text" name="zip" value={this.state.zip} onChange={this.handleInput} placeholder="5 digit zip" />
                        </div>
                        <div className= "input-wrapper distance-wrapper">
                            <label className= "search-label distance-label" htmlFor="distance">Within:</label>
                            <br />
                            <select id="distance" name="distance" value={this.state.distance} onChange={this.handleSelect} className="input-text">
                                <option value="5">5 miles</option>
                                <option value="10">10 miles</option>
                                <option value="25">25 miles</option>
                                <option value="50">50 miles</option>
                                <option value="any">Any Dist.</option>
                            </select>
                        </div>
                    </div>
                    <div className= "no-vaccine-checkbox">
                        <input type="checkbox" id="no-vaccine" checked={this.state.show_unavailable} onChange={this.handleCheckbox}/>
                        <label htmlFor="no-vaccine" className="no-vaccine-label">Show results with no availability</label>
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
