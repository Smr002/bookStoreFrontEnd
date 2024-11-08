import React, { Component } from 'react';
import "../signin.css";
import axios from 'axios';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });

      // Check for token in the response and save it to localStorage
      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem('token', access_token); // Save token in localStorage
        alert('Login successful!');
        window.location.assign('/admin/dashboard'); // Redirect to admin/dashboard or another page
      }
    } catch (error) {
      console.error("Login failed:", error);
      this.setState({ errorMessage: 'Invalid username or password' });
    }
  };

  handleSignUp = () => {
    // Redirect to the Sign Up page
    window.location.assign('/signup');
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
      <section className='signIn'>
        <div className="login">
          <h4>Login</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="text_area">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="text_input"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="text_area">
              <input
                type="password"
                name="password"
                placeholder="******"
                className="text_input"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
            <input
              type="submit"
              value="LOGIN"
              className="btn"
            />
            <button
              type="button" // Changed from submit to button
              className="btn"
              onClick={this.handleSignUp} // Redirect to Sign Up page
            >
              Sign Up
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </section>
    );
  }
}

export default Signin;
