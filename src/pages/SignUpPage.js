import axios from "axios";
import React, { Component, useState } from "react";

class SignUpPage extends Component {
   state = {
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
   };

   handleInput = (event) => {
      const { id, value } = event.target;
      this.setState({
         ...this.state,
         [id]: value,
      });
   };
   submit = (event) => {
      event.preventDefault();
      const { username, email, password } = this.state;
      const body = {
         username,
         email,
         password,
      };
      // using axios
      //axios.post("/api/1.0/users", body);

      //using fetch
      fetch("/api/1.0/users", {
         methods: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      });
   };

   // using fetching
   render() {
      let disabled = true;
      const { password, passwordRepeat } = this.state;
      if (password && passwordRepeat) {
         disabled = password !== passwordRepeat;
      }
      return (
         <div>
            <form>
               <h1>Sign Up</h1>
               <label htmlFor="username">Username</label>
               <input onChange={this.handleInput} id="username" type="text" />
               <label htmlFor="email">E-Mail</label>
               <input onChange={this.handleInput} id="email" type="text" />
               <label htmlFor="password">Password</label>
               <input
                  onChange={this.handleInput}
                  id="password"
                  type="password"
               />
               <label htmlFor="passwordRepeat">Password Repeat</label>
               <input
                  onChange={this.handleInput}
                  id="passwordRepeat"
                  type="password"
               />
               <button onClick={this.submit} disabled={disabled}>
                  Sign Up
               </button>
            </form>
         </div>
      );
   }
}

export default SignUpPage;
