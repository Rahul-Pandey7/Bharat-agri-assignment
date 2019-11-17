import React from "react";
import Protected from "./Protected";

let name = JSON.parse(localStorage.getItem("name"));

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  logout = () => {
    Protected.logout(() => {
      this.props.history.push("/");
    });
  };

  // localStorage.setItem("name", JSON.stringify());

  render() {
    return (
      <React.Fragment>
        <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-light">
            <h3 class="navbar-brand text-success">Welcome {name.name}!</h3>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto"></ul>

              <button
                class="btn btn-outline-danger my-2 my-sm-0"
                onClick={this.logout}
                type="button"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
