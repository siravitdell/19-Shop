import { React, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('currentUser', JSON.stringify(result))
      toast.success("Login successfull");
      window.location.href='/'
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };
  return (
    <div className="login">
      <div className="l-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_sz668bkw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-5 z1">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="r-btn" onClick={login}>Login</button>
            <hr />
            <span className="nrr">New to 19 Shop? </span>
            <Link to="/register" className="nr">
              Register now.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
