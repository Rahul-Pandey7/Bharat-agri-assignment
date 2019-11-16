import React from "react";
import axios from "axios";
import queryString from "query-string";

export default class EachMovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      director: "",
      plot: "",
      actors: ""
    };
  }

  componentDidMount = () => {
    axios({
      method: "get",
      url: `http://www.omdbapi.com/?apikey=3e2e5fed&t=${this.props.match.params.name}`
    })
      .then(response => {
        console.log(response.data);

        this.setState({
          name: response.data.Title,
          plot: response.data.Plot,
          director: response.data.Director,
          actors: response.data.Actors
        });
      })
      .catch(err => alert(err));
  };
  render() {
    return (
      <React.Fragment>
        <div className="mt-5"></div>
        <div className="container mt-5">
          <div className="card shadow-lg" style={{ height: "27rem" }}>
            <center className="mt-5">
              <h3 className="card-title">
                <b>Title:</b>
                {this.state.name}
              </h3>
              <br />
              <p>
                <b>Plot:</b>
                {this.state.plot}
              </p>
              <br />
              <p>
                <b>Director:</b>
                {this.state.director}
              </p>
              <br />
              <p>
                <b>Starring:</b>
                {this.state.actors}
              </p>
              <br />
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
