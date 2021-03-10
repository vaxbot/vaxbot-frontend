import React, { Component } from 'react';
import "./Home.css";
const sample_data = require("../../test/sample_data.js")

class Home extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            providers: [],
            last_updated: null,
            available_count: 0,
            show_unavailable: false,
        }
    }
    
    addProviders(arr) {
        this.setState((state, arr) => {
            const new_list = state.providers.concat(arr);
            return { new_list }
        });
    }
    
    componentDidMount(){
      
      
    }
    
    render() {
      
      
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
        </div>
      )
    }
}

export default Home;
