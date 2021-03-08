import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Footer, Home, About } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
