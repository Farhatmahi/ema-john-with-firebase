import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import "./Signup.css";

const Signup = () => {

  const [error, setError] = useState('')
  const {createUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm)

    if(password.length < 6){
      setError("Password must be at least 6 characters")
      return
    }

    if(password !== confirm){
      setError("Your password didn't match")
      return;
    }

    createUser(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user)
      form.reset()
    }).catch((err) => {
      console.error(err)
    });

  }

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" required />
          </div>
          <input className="btn-submit" type="submit" value="Sign up" />
        </form>
        <p>
          Already have an account?<Link to="/login">Log in</Link>
        </p>
        <p className="text-error">{error}</p>
      </div>
    </div>
  );
};

export default Signup;
