import React from "react";
import axios from "axios";
import Protected from "./Protected";
import "./style.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      userName: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount = () => {
    axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users`
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          arr: [...response.data]
        });
      })
      .catch(err => alert(err));
  };

  login = () => {
    var name = this.state.arr.find(item => {
      return this.state.userName === item.username;
    });
    if (name === undefined) {
      alert("Invalid Username");
    } else {
      Protected.login(() => {
        localStorage.setItem("name", JSON.stringify(name));
        this.props.history.push(`/home`);
      });
    }
  };
  render() {
    return (
      <div className="body">
        <div className="text-center text-light">
          <h1 className="offset-1">Please Login to Continue</h1>
        </div>
        <div
          className="bg jumbotron w-25 offset-5 container"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <form>
            <center>
              <div className="form-group ">
                <input
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleInput}
                  className="form-control w-50"
                  placeholder="Enter Username"
                />
              </div>
              <button
                type="button"
                onClick={this.login}
                class="btn btn-primary"
              >
                Login
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}
