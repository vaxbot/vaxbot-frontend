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
                    <a target="_blank" rel="noopener noreferrer" href={ this.props.url }>
                        <span className="button-link-label available">GO TO SITE</span>
                    </a>
                </div>
            )
        } else if(!this.props.vaccine_available) {
            link_button = (
                <div className="provider-item button-link unavailable">
                    <a target="_blank" rel="noopener noreferrer" href={ this.props.url }>
                        <span className="button-link-label unavailable">NOT AVAILABLE</span>
                    </a>
                </div>
            )
        }
        
        //generate formatted dates list
        const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
        let dates = [];
        if(this.props.dates.length >0) {
            let sorted = this.props.dates.slice()
                sorted.sort((a, b) => {
                    var dateA = new Date(a.updatedAt);
                    var dateB = new Date(b.updatedAt);
                    if(dateA > dateB){
                    return -1
                    }
                    if(dateA < dateB) {
                    return 1
                    }
                })
            dates.push(<div className= "date-available date-available-label">Available:</div>)
            for(let i=0; i<sorted.length; i++) {
                if(i >=3) {
                    dates.push(<div className="date-available date-available-meta"> and {sorted.length - i} more...</div>)
                    break;
                }
                
                let date = new Date(sorted[i]);
                dates.push(<div className="date-available">{months[date.getMonth() - 1]} {date.getDate()}</div>);
            }    
        }
        
        return(
            <div id="123" className={ this.props.visible ? "provider provider-container" : "provider provider-container hidden"}>
                <div className="provider-item name">{this.props.name}</div>
                <div className="provider-item address1">{ this.props.address1 }</div>
                <div className="provider-item city-state">{ this.props.city }, { this.props.state }</div>
                <div className="provider-item tags-container">{ tags }</div>
                { link_button }
                <div className="provider-item available-info">{ dates } </div>
            </div>
        
        )
    
    }
}
export default Provider;
