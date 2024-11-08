import React, { Component } from 'react';
import "../signin.css";
import { signupUser } from '../api'; // This API function will handle the signup request

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
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
      // Call the signupUser function from API, which makes a request to the backend
      const response = await signupUser(username, password);

      // Save the token in localStorage if returned from the API
      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
      }

      // Show success message and redirect to login page after 2 seconds
      this.setState({
        successMessage: 'User registered successfully! Redirecting to login...',
        errorMessage: '',
      });
      setTimeout(() => window.location.assign('/signin'), 2000); // Redirect to login
    } catch (error) {
      console.error("Signup failed:", error);
      this.setState({ errorMessage: 'Username is already taken', successMessage: '' });
    }
  };

  render() {
    const { username, password, errorMessage, successMessage } = this.state;

    return (
      <section className='signIn'>
        <div className="login">
          <h4>Sign Up</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="text_area">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="text_input"
                value={username}
                onChange={this.handleInputChange}
                required
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
                required
              />
            </div>
            <input
              type="submit"
              value="SIGN UP"
              className="btn"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
          <a className="link" href="/signin">Back to Login</a>
        </div>
      </section>
    );
  }
}

export default Signup;
