import React from "react";
import axios from "axios";
export default class EachMovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      director: "",
      plot: "",
      actors: "",
      poster: "",
      rating: "",
      genre: "",
      writer: ""
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
          actors: response.data.Actors,
          poster: response.data.Poster,
          rating: response.data.imdbRating,
          genre: response.data.Genre,
          writer: response.data.Writer
        });
      })
      .catch(err => alert(err));
  };
  render() {
    return (
      <React.Fragment>
        <div className="mt-5"></div>
        <div className="container w-75 mt-5">
          <div className="card shadow-lg" style={{ height: "25rem" }}>
            <div className="row">
              <div
                className="col-lg-4 col-md-12 col-sm-12"
                style={{ transform: "rotate(3deg)" }}
              >
                <img
                  alt="poster"
                  src={this.state.poster}
                  className="w-75"
                  // style={{
                  //   filter: "blur(5px)"
                  // }}
                ></img>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12">
                <h1 className="card-title">{this.state.name}</h1>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/star.png"
                  alt="rating"
                />
                <span>
                  {this.state.rating} &nbsp; &nbsp; || &nbsp; &nbsp; &nbsp;{" "}
                  {this.state.genre}
                </span>
                <p>{this.state.plot}</p>
                <p>
                  <b>
                    <img
                      src="https://img.icons8.com/material-two-tone/14/000000/writer-female.png"
                      alt="writer"
                    />
                    &nbsp;&nbsp; &nbsp; Written By: &nbsp;
                  </b>{" "}
                  &nbsp; &nbsp;
                  {this.state.writer}
                </p>
                <p>
                  <b>
                    {" "}
                    <img
                      src="https://img.icons8.com/pastel-glyph/18/000000/school-director-1--v1.png"
                      alt="director"
                    />
                    &nbsp; &nbsp; Directed By: &nbsp;
                  </b>
                  {this.state.director}
                </p>
                <p>
                  <b>
                    <img
                      src="https://img.icons8.com/color/35/000000/recent-celebrity.png"
                      alt="actors"
                    />
                    Starring: &nbsp;
                  </b>
                  {this.state.actors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
