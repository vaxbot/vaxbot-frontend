import React, { Component } from 'react';
import "./Provider.css";

class Provider extends Component {
    
    /* PROPS
    *   id = { provider._id }
    *   name = { provider.name }
    *   address1 = { provider.address1 }
    *   city= { provider.city }
    *   state= { provider.state }
    *   zip = { provider.zip }
    *   dates = { provider.dates }
    *   vaccine_tags = { provider.vaccine_tags }
    *   tags = { provider.tags }
    *   url = { provider.contact_url ? provider.contact_url : provider.source_url }
    *   visible = { provider.vaccine_available || this.state.show_unavailable}
    */

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
        
        }
    }
    
    render() {
     
        return(
            <div id="123" className={ this.props.visible ? "provider provider-container" : "provider provider-container hidden"}>
                <div className="provider-item name">{this.props.name}</div>
                <div className="provider-item button-link">
                    <a href={ this.props.url }>go to site</a>
                </div>
                <div className="provider-item address1">{ this.props.address1 }</div>
                <div className="provider-item city-state">{ this.props.city }, { this.props.state }</div>
                <div className="provider-item available-info">Available: { this.props.dates }</div>
                <div className="provider-item tags">{ this.props.vaccine_tags }, { this.props.tags }</div>
            </div>
        
        )
    
    }
}
export default Provider;
