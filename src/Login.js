import React from "react";
import axios from "axios";
class Login extends React.Component {
  // Data
  state = {
    email: "",
    password: "",
    error: ""
  };
  // Methods
  login = e => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data === "email not found") {
          this.setState({
            error: "Email not found"
          });
        } else if (response.data === "invalid password") {
          this.setState({
            error: "invalid password"
          });
        } else {
          localStorage.setItem("token", response.data);
          this.props.history.push("/");
        }
      });
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.login}>
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
          Login
        </button>
        <div className="link">
          <a href="/signup">New here? Create an account</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default Login;
