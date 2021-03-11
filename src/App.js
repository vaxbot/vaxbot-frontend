import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import "./App.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faCoffee, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faBars, faTimes, faTwitter, faGithub, faCoffee, faEnvelope)

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/disclaimer" exact component={() => <Disclaimer />} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
