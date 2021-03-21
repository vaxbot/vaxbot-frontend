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
    *   distance = {provider.dist ? Number(provider.dist.calculated.toFixed(1)) : null}
    *   phone = { provider.phone || null }
    *   dates = { provider.dates }
    *   vaccine_tags = { provider.vaccine_tags }
    *   tags = { provider.tags }
    *   url = { provider.contact_url ? provider.contact_url : provider.source_url }
    *   updated = { provider.source_updated ? provider.source_updated : provider.updatedAt }
    *   vaccine_available = { provider.vaccine_available }
    *   formattedTimeFromNow = { this.formattedTimeFromNow }
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
        
        // show distance from query
        let distance = "";
        if(this.props.distance) {
            distance = (
                <div className= "provider-item distance">{ this.props.distance } miles</div>
            )
        }
        
        // generate available/unavailable link button
        let link_button;
        if(this.props.url){
            if(this.props.vaccine_available) {
                link_button = (
                    <div className="provider-item button-link available">
                        <a target="_blank" className="provider-link" rel="noopener noreferrer" href={ this.props.url }>
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
        } else {
            link_button = (
                <div className="provider-item button-link unavailable">
                    <span className="button-link-label unavailable">NO LINK PROVIDED</span>
                </div>
            )
        }
        
        //generate formatted dates list
        
        const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
        let dates = "";
        if(this.props.dates.length >0) {
            let sorted = this.props.dates.slice();
            sorted.sort((a, b) => {
                let date_a = new Date(a);
                let date_b = new Date(b);
                if(date_a < date_b){
                return -1
                }
                if(date_b > date_a) {
                return 1
                }
            })
            let first_date = new Date(sorted[0]);
            let last_date = new Date(sorted.slice(-1));
            let appt_or_event = "appointments";
            if(first_date.getMonth() == last_date.getMonth() && first_date.getDate() == last_date.getDate()) {
                dates = ( <div><span className="dates-label">{first_date.getMonth()}/{first_date.getDate()}:  </span>
                            <span className="dates-count">{sorted.length} {appt_or_event}</span></div>);
            } else {
                dates = ( <div><span className="dates-label">{first_date.getMonth()}/{first_date.getDate()} - {last_date.getMonth()}/{last_date.getDate()}:  </span>
                            <span className="dates-count">{sorted.length} {appt_or_event}</span></div>);
            }
        }
        
        return(
            <div id={ this.props.id } className="provider provider-container">
                <div className="provider-info-wrapper">
                    <div className="provider-item name">{this.props.name}</div>
                    {distance}
                    <div className="provider-item address1">{ this.props.address1 }</div>
                    <div className="provider-item city-state">{ this.props.city }, { this.props.state } { this.props.zip }</div>
                    <div className="provider-item phone">{ this.props.phone ? this.props.phone : "" }</div>
                    <div className="provider-item tags-container">{ tags }</div>
                    <div className="provider-item dates-available">{ dates } </div>
                </div>
                <div className="provider-button-wrapper">
                    { link_button }
                    <div className="provider-item last-updated">Updated { this.props.formattedTimeFromNow(new Date(this.props.updated)) } ago</div>
                </div>
            </div>
        
        )
    
    }
}
export default Provider;
