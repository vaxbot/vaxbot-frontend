import React, { Component } from 'react';
import "./Provider.css";

class Provider extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
        
        }
    }
    
    render() {
     
        return(
            <div id="123" className="provider provider-container">
                <div className="provider-item name">MErcy Hospitalk</div>
                <div className="provider-item button-link">
                    <button>Go to Site</button>
                </div>
                <div className="provider-item address1">12345 StreetPLace ln.</div>
                <div className="provider-item city-state">Salem, MO</div>
                <div className="provider-item available-info">Available: 8/9. 8/10, 8/11</div>
                <div className="provider-item tags">walk-ins, booster-only</div>
            </div>
        
        )
    
    }
}
export default Provider;
