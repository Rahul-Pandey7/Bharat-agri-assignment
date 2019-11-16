import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Protected from "./Protected";
import queryString from "query-string";

let name = JSON.parse(localStorage.getItem("name"));

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      searchHistory: [],
      result: {
        search: "",
        page: 1
      }
    };
  }

  //search Bar
  handleSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // let history = JSON.parse(localStorage.getItem(`${name.name}`));
    // console.log(history);
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

  //geting API
  get_api = values => {
    this.setState({
      result: values
    });
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/?apikey=3e2e5fed&${queryString.stringify(
        values
      )}`

      //   page: values.page
    }).then(response => {
      console.log(response.data);
      // this.setState({
      //     items: response.data
      // })
    });
  };

  componentDidMount() {
    let values = queryString.parse(this.props.location.search);
    console.log(values);
    let obj = {
      page: values.page,
      search: values.search
    };
    if (obj.page === undefined) {
      obj.page = 1;
    }
    console.log(obj.page);
    this.get_api(obj);
  }

  //changing page
  change_page = e => {
    let new_result = this.state.result;
    if (e.target.textContent === "Next" || e.target.textContent === "Prev") {
      if (e.target.textContent === "Next") {
        new_result.page = Number(this.state.result.page) + 1;
        console.log(e.target.textContent);
        this.setState(
          {
            result: new_result
          },
          () => {
            this.props.history.push(`?${queryString.stringify(new_result)}`);
          }
        );
        this.get_api(new_result);
      } else {
        console.log(e.target.textContent);
        new_result.page = Number(this.state.filter.page) - 1;
        this.setState(
          {
            filter: new_result
          },
          () => {
            this.props.history.push(`?${queryString.stringify(new_result)}`);
          }
        );
        this.get_api(new_result);
      }
    } else {
      console.log(e.target.textContent);
      new_result.page = e.target.textContent;
      this.setState(
        {
          result: new_result
        },
        () => {
          this.props.history.push(`?${queryString.stringify(new_result)}`);
        }
      );
      this.get_api(new_result);
    }
  };

  //searching Movie
  //   search = () => {
  //     axios({
  //       method: "get",
  //       url: `http://www.omdbapi.com/?s=${this.state.search}`,
  //       params: {
  //         apikey: "3e2e5fed"
  //       }
  //     })
  //       .then(response => {
  //         console.log(response.data);
  //         this.setState({
  //           arr: [...response.data.Search]
  //         });
  //       })
  //       .catch(err => alert("No such Movie found"));
  //     if (this.state.arr) {
  //       this.state.searchHistory.push(this.state.search);
  //     }
  //   };

  //searching_new
  search = () => {
    let Search = this.state.result;
    console.log(this.state.result);
    Search.search = this.state.result.search;
    Search.page = 1;
    if (this.state.result.search !== " ") {
      this.get_api(queryString.stringify(Search));
      console.log(Search);
      this.setState(
        {
          result: Search
        },
        () => {
          this.props.history.push(`?${queryString.stringify(Search)}`);
        }
      );
    }
  };

  render() {
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
        <center>
          <div className="container mt-5">
            <input
              type="text"
              name="search"
              list="data"
              value={this.state.searchBox}
              onChange={this.handleSearch}
              className="form-control w-50"
              placeholder="Search Movies..."
            />
            <datalist id="data" />

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

                  {/*pagiantion */}
                  {this.state.result.search !== undefined ? (
                    <div className="container text-center">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) - 1}
                          >
                            Prev
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page)}
                          >
                            {Number(this.state.result.page)}
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) + 1}
                          >
                            {Number(this.state.result.page) + 1}
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) + 2}
                          >
                            {Number(this.state.result.page) + 2}
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) + 3}
                          >
                            {Number(this.state.result.page) + 3}
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) + 4}
                          >
                            {Number(this.state.result.page) + 4}
                          </li>
                          <li
                            className="page-item page-link"
                            onClick={this.change_page}
                            name={Number(this.state.result.page) + 1}
                          >
                            Next
                          </li>
                        </ul>
                      </nav>
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
