import React, { useState } from "react";
import setPasswordImage from "./../../assets/auth/set_password.svg";
import CommonAuthLayout from "./CommonAuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../utils/constants";

function SetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showToast, setShowToast] = useState(null);
  const location = useLocation();

  function backButtonFunction() {
    navigate(-1);
  }
  async function VerifyButtonFunction() {
    try {
      if (password !== reEnterPassword) {
        setShowToast("Both Password and Re Entered password should be same");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      if (!location.state) {
        setShowToast("Please come in Sequence Process");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      const { emailId } = location.state;

      const res = await axios.put(BASE_URL + "/update_password", {
        emailId: emailId,
        password: password,
      });

      if (res.data.status == 1) {
        navigate("/login");
        return;
      }
      setShowToast(res.data.message);
      setTimeout(() => setShowToast(null), 3000);
      // use Toast here if any errors occers
    } catch (e) {
      setShowToast(e);
      setTimeout(() => setShowToast(null), 3000);
    }
  }

  return (
    <CommonAuthLayout
      backButtonName="Back to login"
      backButtonOnClick={backButtonFunction}
      title="Set a password"
      details="Your previous password has been reseted. Please set a new password for your account."
      submitButtonName="Set password"
      submitButtonOnClick={VerifyButtonFunction}
      image={setPasswordImage}
    >
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        className="w-full mt-5 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={reEnterPassword}
        onChange={(e) => setReEnterPassword(e.target.value)}
        placeholder="Re-enter Password "
        className="w-full mb-8 mt-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showToast != null && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{showToast}</span>
          </div>
        </div>
      )}
    </CommonAuthLayout>
  );
}

export default SetPassword;
