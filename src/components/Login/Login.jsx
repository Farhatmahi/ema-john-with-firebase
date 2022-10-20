import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import "./Login.css";

const Login = () => {

  const {signInUser} = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value
    const password = form.password.value;

    signInUser(email, password)
    .then((result) => {
      const user = result.user
      console.log(user)
      navigate(from, {replace : true})
    }).catch((err) => {
      console.error(err)
    });

  }


  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <input className="btn-submit" type="submit" value="login" />
      </form>
      <p>New to ema-john? <Link to='/signup' >Create a new account</Link></p>
    </div>
  );
};

export default Login;
