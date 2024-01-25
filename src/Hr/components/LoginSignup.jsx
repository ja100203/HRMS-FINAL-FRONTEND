import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../LoginSignup.scss";
import { useNavigate, Link } from "react-router-dom";
import profile from "../asset/images/profile.png";
import password from "../asset/images/password.png";
import oriveLogo from "../asset/images/Orive Logo 3.png";
import httpClient from "./HttpClient";
import keycloak from "keycloak-js";

let initOptions = {
  url: "http://localhost:8080/",
  realm: "master",
  clientId: "react-client",
};

let kc = new keycloak(initOptions);

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then(
  (auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
      console.log("auth", auth);
      console.log("keycloak", kc);
      console.log("Access token", kc.token);

      httpClient.default.headers.common[
        "Authorization"
      ] = `Bearer $('token expired')`;

      kc.onTokenExpired = () => {
        console.log("token expired");
      };
    }
  },
  () => {
    console.error("Authentication Error");
  }
);

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSign = async (e, type) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://sih2023-backend.onrender.com/${type}`,
        details,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data?.token) {
        toast.success(
          `${type.charAt(0).toUpperCase()}${type.substring(1)} successful`,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(`Could not ${type}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-page">
        <img src={oriveLogo} className="logo-imgg" alt="" />
        <div
          className={`container_loginsignup ${
            isSignup ? "right-panel-active" : ""
          }`}
        >
          <div className="form-container sign-up-container">
            <form className="form-ls">
              <h1
                className="heading-ls"
                style={{ color: "#4B4F5C", fontSize: "25px" }}
              >
                Sign Up
              </h1>
              <input
                className="input-ls"
                type="text"
                name="username"
                placeholder="Name*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                value={details.username}
              />
              <input
                className="input-ls"
                type="email"
                name="email"
                placeholder="Email*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                value={details.email}
              />
              <input
                className="input-ls"
                type="number"
                name="phoneNo"
                placeholder="Phone no*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                value={details.email}
              />
              <input
                className="input-ls"
                type="password"
                name="password"
                placeholder="Password*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                value={details.password}
              />
              <button
                classname="button-ls"
                onClick={(e) => {
                  handleSign(e, "signup");
                }}
              >
                Sign Up
              </button>
              <p className="bottom-text">
                Already have an account?{" "}
                <Link className="link-text-part" onClick={toggleForm}>
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="form-ls">
              <h1
                className="heading-ls"
                style={{
                  color: "#4B4F5C",
                  fontSize: "25px",
                  marginBottom: "20px",
                }}
              >
                Login
              </h1>
              {details.email ? (
                ""
              ) : (
                <img src={profile} className="logo-input1" alt="" />
              )}
              <input
                className="input-ls"
                type="email"
                name="email"
                placeholder="       Name*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                value={details.email}
              />
              {details.password ? (
                ""
              ) : (
                <img src={password} className="logo-input2" alt="" />
              )}
              <input
                className="input-ls"
                type="password"
                name="password"
                placeholder="       Password*"
                onChange={(e) => {
                  setDetails({ ...details, [e.target.name]: e.target.value });
                }}
                style={{ marginTop: "-10px" }}
                value={details.password}
              />
              <div className="social" href="#">
                <div className="rem-me">
                  <input type="checkbox" />
                  <label htmlFor="">Remember Me</label>
                </div>
                <p>Forgot Your Password?</p>
              </div>
              <button
                classname="button-ls"
                onClick={(e) => {
                  handleSign(e, "login");

                  navigate("/HRDashboard");
                }}
              >
                Login
              </button>
              <p className="bottom-text">
                Don't have an account?{" "}
                <Link href="" onClick={toggleForm} className="link-text-part">
                  SignUp
                </Link>
              </p>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="heading-part">
                  <h1 className="heading-ls">Welcome to</h1>
                  <h1 className="heading-ls-comp">Orive Solutions!</h1>
                </div>
                <div className="para-part">
                  <p className="para-ls">
                    By signing up you agree to our{" "}
                    <span className="link-part">Terms and Privacy Policy</span>
                  </p>
                  <p className="para-ls">
                    {" "}
                    Protected by reCAPTCHA.{" "}
                    <span className="link-part">Privacy</span> •{" "}
                    <span className="link-part">Terms</span>
                  </p>
                </div>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="heading-part">
                  <h1 className="heading-ls">Welcome to</h1>
                  <h1 className="heading-ls-comp">Orive Solutions!</h1>
                </div>
                <div className="para-part">
                  <p className="para-ls">
                    By signing up you agree to our{" "}
                    <span className="link-part">Terms and Privacy Policy</span>
                  </p>
                  <p className="para-ls">
                    {" "}
                    Protected by reCAPTCHA.{" "}
                    <span className="link-part">Privacy</span> •{" "}
                    <span className="link-part">Terms</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
