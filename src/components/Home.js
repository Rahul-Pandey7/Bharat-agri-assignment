import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Protected from "./Protected";
import queryString from "query-string";
import "./style.css";
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      searchBox: "",
      welcomeName: "",
      result: {
        s: "",
        page: 1
      }
    };
  }

  //search Bar
  handleSearch = e => {
    this.setState({
      searchBox: e.target.value
    });
  };

  logout = () => {
    Protected.logout(() => {
      this.props.history.push("/");
    });
    localStorage.removeItem("name", JSON.stringify());
  };

  // geting API
  get_api = values => {
    var parsed = queryString.parse(values);
    parsed.apikey = "3e2e5fed";
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/?${queryString.stringify(parsed)}`
    }).then(response => {
      // console.log(response.data);
      if (response.data.Search !== undefined) {
        this.setState({
          arr: [...response.data.Search]
        });
      }
    });
  };

  componentDidMount = () => {
    let values = queryString.parse(this.props.location.search);
    // console.log(values);
    let obj = {
      page: values.page,
      s: values.s
    };
    if (obj.page === undefined) {
      obj.page = 1;
    }
    console.log(obj.page);
    if (obj.s !== undefined) this.get_api(queryString.stringify(obj));
    let name = JSON.parse(localStorage.getItem("name"));
    this.setState({
      welcomeName: name.name,
      result: obj
    });
  };

  dataListItems = () => {};

  // //changing page
  change_page = e => {
    // console.log(e.target.textContent);
    let new_result = this.state.result;
    if (e.target.textContent === "Next" || e.target.textContent === "Prev") {
      if (e.target.textContent === "Next") {
        new_result.page = Number(this.state.result.page) + 1;
        // console.log(e.target.textContent);
        this.setState(
          {
            result: new_result
          },
          () => {
            this.props.history.push(`?${queryString.stringify(new_result)}`);
          }
        );
        // console.log(new_result);
        this.get_api(queryString.stringify(new_result));
      } else {
        // console.log(e.target.textContent);
        new_result.page = Number(this.state.result.page) - 1;
        this.setState(
          {
            result: new_result
          },
          () => {
            this.props.history.push(`?${queryString.stringify(new_result)}`);
          }
        );
        this.get_api(queryString.stringify(new_result));
      }
    } else {
      // console.log(e.target.textContent);
      new_result.page = e.target.textContent;
      this.setState(
        {
          result: new_result
        },
        () => {
          this.props.history.push(`?${queryString.stringify(new_result)}`);
        }
      );
      this.get_api(queryString.stringify(new_result));
    }
  };

  //searching_new
  search = () => {
    let Search = this.state.result;
    Search.s = this.state.searchBox;
    Search.page = 1;
    if (this.state.result.s !== "") {
      this.get_api(queryString.stringify(Search));
      // console.log(Search);
      this.setState(
        {
          result: Search
        },
        () => {
          this.props.history.push(`?${queryString.stringify(Search)}`);
        }
      );
    } else {
      alert("Please enter Movie Name");
    }
    // var dataList = [];
    // dataList = JSON.parse(localStorage.getItem(this.state.welcomeName));
    // console.log(dataList);
    // if (dataList == null) {
    //   if (this.state.result.s !== "") {
    //     dataList.push(this.state.result.s);
    //     localStorage.setItem(this.state.welcomeName, JSON.stringify(dataList));
    //   }
    // } else {
    //   if (this.state.result.s !== " ") {
    //     if (dataList.includes(this.state.result.s) === false) {
    //       dataList.push(this.state.result.s);
    //       localStorage.setItem(
    //         this.state.welcomeName,
    //         JSON.stringify(dataList)
    //       );
    //     } else {
    //       localStorage.setItem(
    //         this.state.welcomeName,
    //         JSON.stringify(dataList)
    //       );
    //     }
    //   }
    // }
  };

  render() {
    var data = JSON.parse(localStorage.getItem(this.state.welcomeName));
    if (data !== null) {
      var optionsList = data.map((items, index) => {
        return <option key={index} value={items}></option>;
      });
    }

    // console.log(this.state.result);
    // console.log(this.state.arr.length);
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-light">
          <h3 class="navbar-brand text-success">
            Welcome {this.state.welcomeName}!
          </h3>
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
              name="search"
              type="text"
              list="data"
              id="search"
              value={this.state.searchBox}
              onChange={this.handleSearch}
              className="input-box-style w-50"
              placeholder="Search Movies..."
            />
            <datalist id="data">{optionsList}</datalist>

            <button type="button" onClick={this.search} class=" mt-3 btn">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/search.png"
                alt="search"
              />
            </button>
          </div>
        </center>
        <div className="mt-5"></div>
        <div className="container">
          <div className="row">
            {this.state.arr.map(items => {
              return (
                <React.Fragment>
                  <div className="card col-lg-4 col-md-6 col-sm-12">
                    <img
                      src={items.Poster}
                      className=" card-img-top card-img"
                      alt="poster"
                    ></img>
                    <div className="card-body bg-dark">
                      <h6 className=" card-title text-center text-warning">
                        {items.Title}
                      </h6>
                      <p className="card-text text-center text-warning">
                        {items.Rating}
                      </p>
                      <Link to={`/details/${items.Title}`}>
                        <button className="btn btn-outline-warning offset-4 mt-2">
                          More Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          {this.state.arr.length !== 0 ? (
            <div className="container text-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination offset-2 mt-2">
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    Prev
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    {Number(this.state.result.page)}
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    {Number(this.state.result.page) + 1}
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    {Number(this.state.result.page) + 2}
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    {Number(this.state.result.page) + 3}
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    {Number(this.state.result.page) + 4}
                  </li>
                  <li
                    className="page-item page-link"
                    onClick={this.change_page}
                  >
                    Next
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/*pagiantion */}
        {/* {this.state.result.s !== undefined ? (
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
          <h1>Invisible</h1>
        )} */}
      </div>
    );
  }
}
