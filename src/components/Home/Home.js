import React, { Component } from 'react';
import "./Home.css";
import Provider from "../Provider/Provider";
const sample_data = require("../../test/sample_data.js")

class Home extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            providers: [],
            //~ last_updated: null,
            //~ available_count: 0,
            show_unavailable: false,
        }
        this.addProviders = this.addProviders.bind(this);
        this.diffDateStingFromNow = this.diffDateStringFromNow.bind(this)
    }
    
    addProviders(arr) {
        console.log(arr[1]);
        const new_list = this.state.providers.concat(arr);
        this.setState({providers: new_list})
    }
    
    diffDateStringFromNow(date) {
      const diff_time = Math.abs(date - Date.now());
      const diff_days = Math.floor(diff_time / (1000 * 60 * 60 * 24))
      const diff_hours = Math.floor(diff_time / (1000 * 60 * 60))
      const diff_minutes = Math.floor(diff_time / (1000 * 60))
      
      if(diff_days > 0) {
          return `${diff_days} days`
      } else if (diff_hours > 0) {
          return `${diff_hours} hours`
      } else if(diff_minutes > 0) {
          return `${diff_minutes} minutes`
      } else {
          return `< 1 minute`
      }
    }
    
    componentDidMount(){
        console.log(sample_data[0]);
      
        this.addProviders(sample_data);
        console.log(this.state.providers[0]);
        
    }
    
    render() {
      
      // Get Most Recently Updated Timestamp from data array
      let last_updated;
      if(this.state.providers.length > 0){
        let sorted = this.state.providers.slice()
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
        let datetime = new Date(sorted[0].updatedAt)
        let diff = this.diffDateStringFromNow(datetime)
        last_updated = `${diff} ago`
      } else {
          last_updated =  null;
      }
      
      // Get number of providers with availability
      let providers_available;
      if(this.state.providers.length > 0){
        providers_available = this.state.providers.filter((provider) => provider.vaccine_available == true)
      } else {
        providers_available = "Zero";
      }
      
      // Update show_unavailable on slider click
      const handleSliderChange = (event) =>  {
        this.setState({show_unavailable: event.target.checked})
      }
      
      // Assemble our provider cards
      let provider_cards = [];
      if(this.state.providers.length > 0){
        for(let provider of this.state.providers) {
            provider_cards.push(<Provider
                id = { provider._id }
                name = { provider.name }
                address1 = { provider.address1 }
                city= { provider.city }
                state= { provider.state }
                zip = { provider.zip }
                dates = { provider.dates }
                vaccine_tags = { provider.vaccine_tags }
                tags = { provider.tags }
                url = { provider.contact_url ? provider.contact_url : provider.source_url }
                visible = { provider.vaccine_available || this.state.show_unavailable}
                vaccine_available = { provider.vaccine_available }
            />)
        }
      }
      
      return (
        <div id="home">
          
          <div id="home-intro">
            <p>Banh mi dreamcatcher ennui pabst paleo photo booth, cray you probably haven't heard of them marfa seitan yuccie humblebrag coloring book.</p>
            <p>Vegan jean shorts meditation four dollar toast post-ironic scenester, neutra mumblecore cold-pressed live-edge.</p>
          </div>
          <div id="home-update">
            <p>
              <b>Update (3/12):</b> vaxbot is currently in super-beta mode! We are working hard to add new vaccine providers in the coming weeks. Right now
              our scans cover a limited range of locations in the St. Louis region.
            </p>
          </div>
          <div id="providers-meta">
            <div className="meta-container">
              <div className="meta-item" >Updated: { last_updated } </div>
              <div className="meta-item">Locations Checked: { this.state.providers.length }</div>
            </div>
            <div className="">Vaxbot found { providers_available.length } Locations with availability</div>
            <div className="">
              <div className="slider-text">Show Unavailable</div>
              <label class="switch">
                <input onChange={ handleSliderChange } type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div className= "provider-cards-wrapper">
            { provider_cards }
          </div>
        </div>
      )
    }
}

export default Home;
