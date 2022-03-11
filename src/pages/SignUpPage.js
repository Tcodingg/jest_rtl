import React, { Component, useState } from "react";

class SignUpPage extends Component {
   state = {};

   handlePassword = (event) => {
      const { id, value } = event.target;
      this.setState({
         ...this.state,
         [id]: value,
      });
   };
   render() {
      let disabled = true;
      const { password, passwordRepeat } = this.state;
      if (password && passwordRepeat) {
         disabled = password !== passwordRepeat;
      }
      return (
         <div>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="text" />
            <label htmlFor="password">Password</label>
            <input
               onChange={this.handlePassword}
               id="password"
               type="password"
            />
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input
               onChange={this.handlePassword}
               id="passwordRepeat"
               type="password"
            />
            <button disabled={disabled}>Sign Up</button>
         </div>
      );
   }
}

export default SignUpPage;
