import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import EachMovieDetails from "./EachMovieDetails";
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("name") !== undefined ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Login} />{" "}
          <ProtectedRoute path="/home" exact component={Home} />
          <Route path="/details/:name" exact component={EachMovieDetails} />
        </Router>
      </div>
    );
  }
}
