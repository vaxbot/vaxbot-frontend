import React, { Component } from 'react';
import "./SearchBar.css";

const zips_data = require("../../modules/mo_zipcodes.json");

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            distance: "any",
            zip: null,
            show_unavailable: false,
            zip_error: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.zipToCoords = this.zipToCoords.bind(this);
    }
    
    componentDidMount() {
        
    }
    
    zipToCoords (arr, x) { 
        // binary search on a sorted array of zipcode/coordinate objs
        
        let start=0, end=arr.length-1; 
        let count = 0      
        // Iterate while start not meets end 
        while (start<=end){ 
            // Find the mid index 
            let mid=Math.floor((start + end)/2); 
       
            // If element is present at mid, return True 
            if (arr[mid].fields.zip==x) return arr[mid].fields.geopoint; 
      
            // Else look in left or right half accordingly 
            else if (Number(arr[mid].fields.zip) < Number(x))  
                 start = mid + 1; 
            else
                 end = mid - 1; 
        } 
       
        return false; 
    } 
    
    handleSubmit(event) {
        let options = {};
        if(!this.state.show_unavailable) {
            options["vaccine_available"] = true;
        }
        
        if(this.state.distance != "any") {
            options["radius"] = Number(this.state.distance);
        }
        
        if(this.state.zip != null) {
            let coords = this.zipToCoords(zips_data, this.state.zip);
            if(coords) {
                
                options["lon"] = coords[1];
                options["lat"] = coords[0];
                
                this.props.fetchData(options);
            } else {
                this.setState({zip_error: true});
            }
            
        } else {
            this.setState({zip_error: true});
        }
        
        event.preventDefault();
    }
    
    handleSelect(event) {
        this.setState({distance: event.target.value});

    }
    
    handleInput(event) {
        this.setState({
            zip: event.target.value,
            zip_error: false,
        });

    }
    
    handleCheckbox(event) {
        this.setState({show_unavailable: event.target.checked});
 
    }
    
    render() {
        let zipError = ""
    
        if(this.state.zip_error){
            zipError = (
                <div className= "zip-error">Error: zip code not found!</div>
            )
        }
        return(
            <form className= "search-bar" onSubmit={this.handleSubmit}>
                <div className= "search-inputs">
                    <div className= "text-inputs">
                        <div className= "input-wrapper zip-wrapper">
                            <label className= "search-label zip-label" htmlFor="zip">Search Near:</label>
                            <br/>
                            <input type="number" id="zip" className={`input-text ${this.state.zip_error ? 'zip-red' : ''}`} name="zip" value={this.state.zip} onChange={this.handleInput} placeholder="5 digit zip" />
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
                    {zipError}
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
