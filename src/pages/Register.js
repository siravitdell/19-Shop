import { React, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  
  const auth = getAuth();
  const register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      toast.success('Registration successfull')
      setEmail('')
      setPassword('')
      setCPassword('')
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
    }
  };
  return (
    <div className="register">
      <div className="r-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_5olkoiag.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-5 z1">
          <div className="register-form">
            <h2>Register</h2>
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
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
            <button className="r-btn" onClick={register}>
              Register
            </button>
            <hr />
            <span className="nrr">Already have an account? </span>
            <Link to="/login" className="nr">
              Login now.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
