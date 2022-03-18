import axios from "axios";
import React, { Component, useState } from "react";
import Input from "../component/Input";

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
   submit = async (event) => {
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
         await axios.post("/api/1.0/users", body);
         this.setState({ signUpSuccess: true });
      } catch (error) {
         this.setState({ apiProgress: false });
         if (error.response.status === 400) {
            this.setState({ errors: error.response.data.validationErrors });
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

      let passwordMisMatch =
         password !== passwordRepeat ? "Mismatch password" : "";
      return (
         <div
            className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
            data-testid="signup-page"
         >
            {!signUpSuccess && (
               <form className="card mt-5" data-testid="form-signup">
                  <div className="card-body">
                     <h1 className="text-center">Sign Up</h1>
                     <Input
                        id="username"
                        label="Username"
                        onChange={this.handleInput}
                        help={errors.username}
                     />
                     <Input
                        id="email"
                        label="E-Mail"
                        onChange={this.handleInput}
                        help={errors.email}
                     />
                     <Input
                        id="password"
                        label="Password"
                        onChange={this.handleInput}
                        help={errors.password}
                        type="password"
                     />
                     <Input
                        id="passwordRepeat"
                        label="Password Repeat"
                        onChange={this.handleInput}
                        type="password"
                        help={passwordMisMatch}
                     />

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
