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
      <div>
        <div className="style fade-in">
          <form>
            <center>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control w-25 text-light text-center"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleInput}
                  placeholder="Enter Username"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "2px solid red"
                  }}
                />
                <button
                  type="button"
                  onClick={this.login}
                  class="btn btn-outline-danger mt-3"
                >
                  Login
                </button>
              </div>
            </center>
          </form>
        </div>
      </div>
    );
  }
}
