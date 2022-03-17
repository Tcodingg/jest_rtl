import axios from "axios";
import React, { Component, useState } from "react";

class SignUpPage extends Component {
   state = {
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
      apiProgress: false,
      signUpSuccess: false,
      errors: {},
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
      this.setState({
         apiProgress: true,
      });
      // using axios
      try {
         axios.post("/api/1.0/users", body);
         this.setState({ signUpSuccess: true, apiProgress: false });
      } catch (error) {
         this.setState({ signUpSuccess: false });
         if (error.response.status === 400) {
            this.state({ errors: error.response.data.validationErrors });
         }
      }

      //using fetch
      // fetch("/api/1.0/users", {
      //    method: "POST",
      //    headers: {
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify(body),
      // });
   };

   // using fetching
   render() {
      let disabled = true;
      const { password, passwordRepeat, apiProgress, signUpSuccess, errors } =
         this.state;
      if (password && passwordRepeat) {
         disabled = password !== passwordRepeat;
      }
      return (
         <div
            className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
            data-testid="signup-page"
         >
            {!signUpSuccess && (
               <form className="card mt-5" data-testid="form-signup">
                  <div className="card-body">
                     <h1 className="text-center">Sign Up</h1>
                     <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                           className="form-control"
                           onChange={this.handleInput}
                           id="username"
                           type="text"
                        />
                        <span>{errors.username}</span>
                     </div>

                     <div className="mb-3">
                        <label htmlFor="email">E-Mail</label>
                        <input
                           className="form-control"
                           onChange={this.handleInput}
                           id="email"
                           type="text"
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                           className="form-control"
                           onChange={this.handleInput}
                           id="password"
                           type="password"
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="passwordRepeat">Password Repeat</label>
                        <input
                           className="form-control"
                           onChange={this.handleInput}
                           id="passwordRepeat"
                           type="password"
                        />
                     </div>
                     <div className="text-center">
                        <button
                           className="btn btn-primary"
                           onClick={this.submit}
                           disabled={disabled || apiProgress}
                        >
                           {apiProgress && (
                              <span
                                 className="spinner-border spinner-border-sm"
                                 role="status"
                              ></span>
                           )}
                           Sign Up
                        </button>
                     </div>
                  </div>
               </form>
            )}
            {signUpSuccess && (
               <p className="alert alert-success mt-3">
                  Please check your e-mail to activate your account
               </p>
            )}
         </div>
      );
   }
}

export default SignUpPage;
