import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Protected from "./Protected";

let name = JSON.parse(localStorage.getItem("name"));

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      arr: [],
      searchHistory: [],
      page: 1
    };
  }

  handleSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    let history = JSON.parse(localStorage.getItem(`${name.name}`));
    console.log(history);
  };

  logout = () => {
    Protected.logout(() => {
      this.props.history.push("/");
    });
    localStorage.removeItem("name", JSON.stringify());
    localStorage.setItem(
      `${name.name}`,
      JSON.stringify(this.state.searchHistory)
    );
  };

  search = () => {
    axios({
      method: "get",
      url: `http://www.omdbapi.com/?s=${this.state.search}`,
      params: {
        apikey: "3e2e5fed"
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          arr: [...response.data.Search]
        });
      })
      .catch(err => alert("No such Movie found"));
    if (this.state.arr) {
      this.state.searchHistory.push(this.state.search);
    }
  };

  render() {
    // console.log(this.props.match.params.name);
    // console.log(this.state.searchHistory);

    return (
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
        {/* <Nav /> */}
        <center>
          <div className="container mt-5">
            <input
              type="text"
              name="search"
              value={this.state.searchBox}
              onChange={this.handleSearch}
              className="form-control w-50"
              placeholder="Search Movies..."
            />

            <button
              type="button"
              onClick={this.search}
              class=" mt-3 btn btn-primary"
            >
              Search
            </button>
          </div>
        </center>
        <div className="mt-5"></div>
        <div className="container">
          <div className="row">
            {this.state.arr.map(items => {
              return (
                <React.Fragment>
                  <div className="col-lg-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{items.Title}</h5>
                        <img src={items.Poster} alt="poster" />
                        <Link to={`/details/${items.Title}`}>
                          <button>See Info</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
