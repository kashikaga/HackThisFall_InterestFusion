import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { motion } from "framer-motion";
import OneSignal from "react-onesignal";

const Login2 = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password, playerId: OneSignal.User.PushSubscription.id },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,

          playerId: OneSignal.User.PushSubscription.id,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="card bg-white w-96 shadow-2xl rounded-lg overflow-hidden"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="card-body p-6"
        >
          <h2 className="card-title justify-center text-2xl font-bold text-gray-800">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-3">
                  <span className="label-text font-semibold">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs bg-white text-gray-800"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <span className="label-text font-semibold">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs bg-white text-gray-800"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-3">
              <span className="label-text font-semibold">Email ID:</span>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs bg-white text-gray-800"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-3">
              <span className="label-text font-semibold">Password</span>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs bg-white text-gray-800"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
          <div className="card-actions justify-center mt-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </motion.button>
          </div>
          <motion.p
            whileHover={{ color: "#6b7280" }}
            className="text-center text-sm mt-4 text-gray-600 cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Login2;
