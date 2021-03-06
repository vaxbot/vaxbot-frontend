import React, { Component } from 'react';
import "./Home.css";
import Provider from "../Provider/Provider";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//~ const sample_data = require("../../test/sample_data.js");


class Home extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            providers_scanned: 0,
            providers_with_vaccine: 0,
            last_scan: null,
            providers: [],
            meta_loading: false,
            meta_error: false,
            api_error: false,
            show_unavailable: false,
            loading: false,
            api_error: false,
        }
        this.addProviders = this.addProviders.bind(this);
        this.formattedTimeFromNow = this.formattedTimeFromNow.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchMeta = this.fetchMeta.bind(this);
    }
    
    async fetchMeta() {
        this.setState({meta_loading: true});
        
        await fetch("https://api.vaxbot.org/v1/providers/metadata")
            .then(response => {
                if(response.status < 200 || response.status > 299) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then(json => this.setState({
                meta_loading: false,
                providers_scanned: json.providers_scanned,
                providers_with_vaccine: json.providers_with_vaccine,
                last_scan: json.last_scan,
            }))
            .catch(err => {
                console.log(err);
                this.setState({
                    meta_loading: false,
                    meta_error: true
                });
            })
    }
    
    async fetchData(options = null) {
      let query = "";
      if(options){
          query += "search?";
          for(let option in options) {
            query += `${option}=${options[option]}&`;
          }
          query = query.replace(/&$/ig, "");
          console.log(query);
      }
      const base_url= "https://api.vaxbot.org/v1/providers/"
      
      this.setState({loading: true});
      
      await fetch(base_url + query)
        .then(response => {
            if(response.status < 200 || response.status > 299) {
                throw new Error(`${response.status}: ${response.statusText}`);
            } else {
                return response.json();
            }
        })
        .then(json => this.setState({
            providers: json,
            loading: false
        }))
        .catch(err => {
            this.setState({
                api_error: true,
                loading: false
            });
            console.log(err);
        })
      //~ this.setState({providers: data})
    }
    
    addProviders(arr) {
        console.log(arr[1]);
        const new_list = this.state.providers.concat(arr);
        this.setState({providers: new_list})
    }
    
    formattedTimeFromNow(date) {
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
          return `a few seconds`
      }
    }
    
    componentDidMount(){
        //Get meta data from a quick lil endpoint
        this.fetchMeta();
        
        //~ send initial search
        let options = {
            vaccine_available: true, 
        }
        this.fetchData(options);
        //~ this.setState({providers: sample_data})
        
    }
    
    render() {
      
        const stl_twitter_link = (
            <span className="twitter-link-wrapper">
                <a className="twitter-link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/vaxbot_stl">
                    <FontAwesomeIcon id="twitter-icon" icon={["fab", "twitter"]}/>
                    <span className="twitter-link-text">@vaxbot_stl</span>
                </a>
            </span>
        )
        
        const kc_twitter_link = (
            <span className="twitter-link-wrapper">
                <a className="twitter-link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/vaxbot_kc">
                    <FontAwesomeIcon id="twitter-icon" icon={["fab", "twitter"]}/>
                    <span className="twitter-link-text">@vaxbot_kc</span>
                </a>
            </span>
        )

        let bmc_link = (
            <a className="bmc-link" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/vaxbot">
                <span>
                    <img src="/images/BMC-logo-wordmark-black.svg" id="bmc-logo" alt="buy me a coffee" />
                </span>
            </a>
        )
        
        let loading_indicator = (
            <div className="loading-results">
                <FontAwesomeIcon icon="spinner" id="spinner" spin />
            </div>
        )
        
        let no_results = (
            <div className="no-results">No Results</div>
        )
        
        let api_error = (
            <div className="api-error-wrapper">
                <img src="/images/broken-robot-100.png" id="broken-robot" alt="broken robot" />
                <div className = "api-error">Oh no! Our robot appears to be broken, please check back later.</div>
            </div>
        )
      
        
        let search_bar = <SearchBar
            fetchData = { this.fetchData }
        />
        
        let meta_data;
        
        if(this.state.meta_error) {                          // fetch returned an error
            meta_data = api_error;         
        } else if(this.state.meta_loading) {                     // no error and we're loading data
            meta_data = loading_indicator; 
        } else {
            meta_data = (
              <div className= "meta-data">
                <div className="meta-item" ><b>Last Scan:</b> { this.state.providers_scanned } providers { this.formattedTimeFromNow(new Date(this.state.last_scan)) } ago </div>
                <div className="">{ this.state.providers_with_vaccine } with vaccines available</div>
              </div>
            )
        }
        
        
        let search_results;
      
        if(this.state.api_error) {                          // fetch returned an error
            search_results = api_error;         
        } else if(this.state.loading) {                     // no error and we're loading data
            search_results = loading_indicator; 
        } else if(this.state.providers.length < 1 ) {       // not loading, no error, and there are no results
            search_results = no_results;        
        } else {                                            // not loading, no error, and we have results
            // Assemble our provider cards
            let provider_cards = [];
            for(let provider of this.state.providers) {

                let card = <Provider
                    id = { provider._id }
                    name = { provider.name }
                    address1 = { provider.address1 }
                    city= { provider.city }
                    state= { provider.state }
                    zip = { provider.zip }
                    distance = {provider.dist ? Number(provider.dist.calculated.toFixed(1)) : null}
                    phone = { provider.phone || null }
                    dates = { provider.dates || [] }
                    vaccine_tags = { provider.vaccine_tags || null }
                    tags = { provider.tags || null }
                    url = { provider.contact_url ? provider.contact_url : null }
                    vaccine_available = { provider.vaccine_available }
                    updated = { provider.source_updated ? provider.source_updated : provider.updatedAt }
                    formattedTimeFromNow = { this.formattedTimeFromNow }
                />

                provider_cards.push(card);
            }
            search_results = provider_cards;
        }
      
      return (
        <div id="home">
          <div id="providers-meta">
            <div className="meta-container">
              <div className="meta-state">Missouri</div>
              {meta_data}
            </div>
          </div>
          <div id="home-intro">
            <span>Vaxbot scans pharmacies as well as state and national resources to help you find available COVID-19 vaccinations in your area.</span>
            <br />
            <br/>
            <span>For notifications of new availablity near you, follow us on Twitter! We automatically post updates as soon as we find them.</span>
            <ul className= "twitter-links">
                <li>St. Louis: {stl_twitter_link}</li>
                <li>Kansas City: {kc_twitter_link}</li>
            </ul>
            <span>Help vaxbot expand! Support us at { bmc_link }</span>
          </div>
          <div id="home-update">
            <p>
              <b>Update (3/22):</b> vaxbot is currently in beta mode! We are working hard to add new features and improvements ASAP!
            </p>
          </div>
          <div className= "search-bar-wrapper"> 
            { search_bar } 
          </div>
          <div className= "search-results-wrapper">
            { search_results }
          </div>
        </div>
      )
    }
}

export default Home;
