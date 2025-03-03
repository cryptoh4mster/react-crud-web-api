import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFile from "./components/add-file.component";
import FilesList from "./components/files-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/files"} className="navbar-brand">
            Digital Design Trainee
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/files"} className="nav-link">
                Files
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add File
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/files"]} component={FilesList} />
            <Route exact path="/add" component={AddFile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
