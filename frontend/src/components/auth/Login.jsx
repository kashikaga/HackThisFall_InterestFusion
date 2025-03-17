import React, { useState } from "react";
import LoginImage from "./../../assets/auth/login.svg";
import CommonAuthLayout from "./CommonAuthLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(null);
  const dispatch = useDispatch();

  async function LoginButtonFunction() {
    try {
      if (!email || !password) {
        setShowToast("Please enter all details");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
          playerId: OneSignal.User.PushSubscription.id,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      console.log(res);
      return navigate("/");
    } catch (err) {
      console.log(err);
      setShowToast(err?.response?.data || "Something went wrong");
      setTimeout(() => setShowToast(null), 3000);
    }
  }

  return (
    <div className="flex flex-col w-screen">
      <div className="flex-1  mt-4">
        <Link to="/" className="btn btn-ghost ml-8 text-xl">
          👩‍💻 InterestFusion
        </Link>
      </div>
      <div className="flex mx-16 lg:mx-32 justify-between">
        <dev className="flex flex-col justify-start mt-12   w-full lg:w-4/12 ">
          <p className="text-3xl font-semibold my-4">Login</p>
          <p>Login to access your travelwise account</p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mt-5 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password "
            className="w-full mb-1 mt-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end mr-4 mb-4">
            <Link to={"/forget-password"}>Forget Passowrd</Link>
          </div>
          {showToast != null && (
            <div className="toast toast-top toast-end">
              <div className="alert alert-error">
                <span>{showToast}</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            onClick={LoginButtonFunction}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
          <div className="flex mt-6 justify-center">
            <p className="text-sm  ">Don’t have an account?</p>
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="text-[#FF8682] text-sm ml-1.5 font-semibold cursor-pointer "
            >
              Sign up
            </a>
          </div>
        </dev>
        <img
          src={LoginImage}
          className="h-[550px]  w-[600px] hidden  lg:block  "
        />
      </div>
    </div>
  );
}

export default Login;
