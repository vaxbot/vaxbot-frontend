import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            menuActive: false
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        const toggle = document.querySelector('.toggle');
        const menu = document.querySelector('.menu');
        
        if (menu.classList.contains("active")){
            menu.classList.remove("active");
            this.setState({ menuActive: false });
        } else {
            menu.classList.add("active");
            this.setState({ menuActive: true });
        }
    }

    componentDidMount() {
        // elements
        const toggle = document.querySelector('.toggle');
        const menu = document.querySelector('.menu');
        const items = document.querySelectorAll('.nav-item');

        // event handlers
        function toggleItem() {
            if (this.classList.contains("submenu-active")) {
            this.classList.remove("submenu-active");
          } else if (menu.querySelector(".submenu-active")) {
            menu.querySelector(".submenu-active").classList.remove("submenu-active");
            this.classList.add("submenu-active");
          } else {
            this.classList.add("submenu-active");
          }
        }

        //close submenu from anywhere in the page
        function closeSubmenu(e){
            let isClickInside = menu.contains(e.target);
          
            if(!isClickInside && menu.querySelector('.submenu-active')) {
            menu.querySelector('.submenu-active').classList.remove('submenu-active');
            }
        }

        // event listeners
        toggle.addEventListener('click', this.toggleMenu, false);
        document.addEventListener('click', closeSubmenu, false);

        for (let item of items){
            if (item.querySelector('.submenu')){
            item.addEventListener('click', toggleItem, false);
            item.addEventListener('keypress', toggleItem, false);
          }
        }
    }

    render() {

        let toggle = (<li className="toggle"><a href="#"><FontAwesomeIcon id="toggle-icon" icon="bars"/></a></li>)

        if (this.state.menuActive){
            toggle = (<li className="toggle"><a href="#"><FontAwesomeIcon id="toggle-icon" icon="times"/></a></li>)
        }

        return (
            <nav className="navbar">
              <ul className="menu">
                <li className="logo"><Link to="/">
                    <div id="logo-container">
                        <img src="/images/robot1.png" id="logo-image" alt="vaxbot" />
                        <div id="logo-text">vaxbot</div>
                    </div>
                </Link></li>
                <li className="nav-item"><Link to="/about">About</Link></li>
                {/*<li className="nav-item"><Link to="/">For Developers</Link></li>*/}
                {/* <li className="nav-item has-submenu">
                  // <a tabIndex="0">About <FontAwesomeIcon icon="chevron-down"/></a>
                 // <ul className="submenu">
                    // <li className="subitem"><a href="/">Contact</a></li>
                    // <li className="subitem"><a href="/">Profile</a></li>
                    // <li className="subitem"><a href="/">Log Out</a></li>
                  // </ul>
                // </li> */}
                { toggle }
              </ul>
            </nav>
        )
    }
}

export default Navbar;
