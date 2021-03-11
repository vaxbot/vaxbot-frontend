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
    *   vaccine_available = { provider.vaccine_available }
    */

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
        
        }
    }
    
    render() {
        
        // concat our tags arrays
        let tags = [];
        if(this.props.vaccine_tags){
            for(let tag of this.props.vaccine_tags){
                tags.push(<span className="item-tag">{tag}</span>)
            }
        }
        if(this.props.tags){
            for(let tag of this.props.tags){
                tags.push(<span className="item-tag">{tag}</span>)
            }
        }
        
        // generate available/unavailable link button
        let link_button;
        if(this.props.vaccine_available) {
            link_button = (
                <div className="provider-item button-link available">
                    <a href={ this.props.url }>
                        <span className="button-link-label available">GO TO SITE</span>
                    </a>
                </div>
            )
        } else if(!this.props.vaccine_available) {
            link_button = (
                <div className="provider-item button-link unavailable">
                    <a href={ this.props.url }>
                        <span className="button-link-label unavailable">NOT AVAILABLE</span>
                    </a>
                </div>
            )
        }
     
        return(
            <div id="123" className={ this.props.visible ? "provider provider-container" : "provider provider-container hidden"}>
                <div className="provider-item name">{this.props.name}</div>
                <div className="provider-item address1">{ this.props.address1 }</div>
                <div className="provider-item city-state">{ this.props.city }, { this.props.state }</div>
                <div className="provider-item tags-container">{ tags }</div>
                { link_button }
                <div className="provider-item available-info">Available: { this.props.dates }</div>
            </div>
        
        )
    
    }
}
export default Provider;
