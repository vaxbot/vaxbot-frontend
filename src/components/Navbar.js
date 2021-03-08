import React, { Component } from 'react';
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
            //~ toggle.querySelector("a").innerHTML = "<FontAwesomeIcon id='toggle-icon' icon='bars'/>";
        } else {
            menu.classList.add("active");
            this.setState({ menuActive: true });
            //~ toggle.querySelector("a").innerHTML = "<FontAwesomeIcon id='toggle-icon' icon='times'/>";
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
        //~ let url = new Url();
        //~ let path = url.path.replace("/", "");
        //~ let components = path.split("/");

        let toggle = (<li className="toggle"><a href="#"><FontAwesomeIcon id="toggle-icon" icon="bars"/></a></li>)

        if (this.state.menuActive){
            toggle = (<li className="toggle"><a href="#"><FontAwesomeIcon id="toggle-icon" icon="times"/></a></li>)
        }

        return (
            <nav className="navbar">
              <ul className="menu">
                <li className="logo"><a href="/"><img src="/images/robot1.png" id="navlogo" alt="vaxbot" />vaxbot</a></li>
                <li className="nav-item"><a href="/">About</a></li>
                <li className="nav-item"><a href="/">For Developers</a></li>
                //~ <li className="nav-item has-submenu">
                  //~ <a tabIndex="0">About <FontAwesomeIcon icon="chevron-down"/></a>
                  //~ <ul className="submenu">
                    //~ <li className="subitem"><a href="/">Contact</a></li>
                    //~ <li className="subitem"><a href="/">Profile</a></li>
                    //~ <li className="subitem"><a href="/">Log Out</a></li>
                  //~ </ul>
                //~ </li>
                { toggle }
              </ul>
            </nav>
        )
    }
}

export default Navbar;
