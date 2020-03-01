import React from "react";
import axios from "axios";
class Signup extends React.Component {
  // Data
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };

  /*	const config = {
    headers: { Authorization: `Bearer ${token}` }
};*/
  // Methods
  signup = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API}/users/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data === "Email already exists") {
          this.setState({
            error: "Email already exists"
          });
        } else {
          localStorage.setItem("token", response.data);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.signup}>
        <input
          type="text"
          placeholder="Full Name"
          value={this.state.name}
          onChange={e =>
            this.setState({
              name: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={e =>
            this.setState({
              email: e.target.value
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e =>
            this.setState({
              password: e.target.value
            })
          }
        />
        <button type="submit" className="positive">
          Signup
        </button>
        <div className="link">
          <a href="/login">Already have an account? Login</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default Signup;
