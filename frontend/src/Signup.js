import React, { Component } from 'react';
import 'whatwg-fetch';
import axios from 'axios'
export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        token: '',
        signUpError: '',
        signInError: '',
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
      };
      this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    }
    onTextboxChangeSignInEmail(event) {
        this.setState({
          signInEmail: event.target.value,
        });
      }
      onTextboxChangeSignInPassword(event){
        this.setState({
            signInPassword: event.target.value,
          });}

          onTextboxChangeSignUpEmail(event) {
            this.setState({
              signUpEmail: event.target.value,
            });
          }
          onTextboxChangeSignUpPassword(event){
            this.setState({
                signUpPassword: event.target.value,
              });}
      onSignUp() {
        // Grab state
        const {
          signUpEmail,
          signUpPassword,
        } = this.state;
        this.setState({
          isLoading: true,
        });
        // Post request to backend
        console.log("signup email", signUpEmail)
        axios.post('http://localhost:3201/signup/'+ this.state.signUpEmail +"/" +this.state.signUpPassword 
          )
          .then(res=> {
            console.log('json', res)
            ;
            if (res.success) {
              this.setState({
                signUpError: res.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: '',
              });
            } else {
              this.setState({
                signUpError: res.message,
                isLoading: false,
              });
            }
          });
      }
      render() {
        const {
          isLoading,
          token,
          signInError,
          signInEmail,
          signInPassword,
          signUpEmail,
          signUpPassword,
          signUpError,
        } = this.state;
        if (isLoading) {
          return (<div><p>Loading...</p></div>);
        }
        if (!token) {
          return (
            <div>
              <div>
                {
                  (signInError) ? (
                    <p>{signInError}</p>
                  ) : (null)
                }
                <p>Sign In</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword}
                />
                <br />
                <button>Sign In</button>
              </div>
              <br />
              <br />
              <div>
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
                  ) : (null)
                }
                <p>Sign Up</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={this.onTextboxChangeSignUpEmail}
                /><br />
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={this.onTextboxChangeSignUpPassword}
                /><br />
                <button onClick={this.onSignUp}>Sign Up</button>
              </div>
           </div>
          );
        }
        return (
          <div>
            <p>Signed in</p>
          </div>
        );
      }}