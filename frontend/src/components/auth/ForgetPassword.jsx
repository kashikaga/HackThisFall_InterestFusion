import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import forgetPasswordImage from "./../../assets/auth/forget_password.svg";
import CommonAuthLayout from "./CommonAuthLayout";
import axios from "axios";
import emailSchema from "./../../utils/validations/emailSchema";
import { BASE_URL } from "./../../utils/constants";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [showToast, setShowToast] = useState(null);

  function backButtonFunction() {
    navigate(-1);
  }
  async function VerifyButtonFunction() {
    const schemaStatus = emailSchema.safeParse(email);
    if (!schemaStatus.success) {
      setEmailError(schemaStatus.error.errors[0]?.message);
      return;
    } else {
      setEmailError(null);
    }
    try {
      const res = await axios.post(BASE_URL + "/forgot_password", {
        emailId: email,
      });

      if (res.data.status == 1) {
        navigate("/verify-code", {
          state: {
            emailId: email,
          },
        });
        return;
      }
      setShowToast(res.data.message);
      setTimeout(() => setShowToast(null), 3000);
      // use Toast here if any errors occers
    } catch (e) {
      setShowToast(e);
    }
    // use Toast here if any errors occers
  }

  return (
    <CommonAuthLayout
      backButtonName="Back"
      backButtonOnClick={backButtonFunction}
      title="Forgot your password?"
      details="Don’t worry, happens to all of us. Enter your email below to recover your password"
      submitButtonName="Submit"
      submitButtonOnClick={VerifyButtonFunction}
      image={forgetPasswordImage}
    >
      <asp:Panel runat="server" ID="pnlForDefault" DefaultButton="btnSearch">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          className={`w-full ${
            emailError ? "mb-2" : "mb-8"
          } mb-8 mt-10 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500  `}
        />
      </asp:Panel>
      {emailError ? (
        <p className="text-red-600 mb-3">{emailError}</p>
      ) : (
        <div></div>
      )}
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

export default ForgetPassword;
