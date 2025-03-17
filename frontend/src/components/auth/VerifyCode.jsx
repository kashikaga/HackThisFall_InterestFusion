import React, { useState } from "react";
import verifyCode from "./../../assets/auth/verify_code.svg";
import CommonAuthLayout from "./CommonAuthLayout";
import OtpInput from "react-otp-input";
import { Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../utils/constants";

function VerifyCode({ route }) {
  const [inputCode, setInputCode] = useState("");
  const [showToast, setShowToast] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  function backButtonFunction() {
    navigate(-1);
  }
  async function VerifyButtonFunction() {
    try {
      if (!(inputCode.length == 6)) {
        setShowToast("Enter full OTP");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      if (!location.state) {
        setShowToast("Please come in Sequence Process");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      const { emailId } = location.state;
      const res = await axios.post(BASE_URL + "/verify_OTP", {
        emailId: emailId,
        otp: inputCode,
      });

      if (res.data.status == 1) {
        navigate("/set-passeword", {
          state: {
            emailId: emailId,
          },
        });
        return;
      }
      setShowToast(res.data.message);
      setTimeout(() => setShowToast(null), 3000);
      // use Toast here if any errors occers
    } catch (e) {
      console.log("********---------********");
      console.log(e);
      setShowToast(e);
      setTimeout(() => setShowToast(null), 3000);
    }
  }

  return (
    <CommonAuthLayout
      backButtonName="Back to login"
      backButtonOnClick={backButtonFunction}
      title="Verify code"
      details="An authentication code has been sent to your email."
      submitButtonName="Verify"
      submitButtonOnClick={VerifyButtonFunction}
      image={verifyCode}
    >
      <OtpInput
        value={inputCode}
        onChange={setInputCode}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus
        inputStyle={{
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          borderRadius: "0.375rem",
          border: "2px ",
          marginRight: "0.5rem",
          marginLeft: "0.5rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      />
      <div className="flex mb-5">
        <p>Didn’t receive a code? </p>
        <span> &nbsp;&nbsp;</span>{" "}
        <a style={{ cursor: "pointer" }} className="text-[#FF8682]">
          Resend
        </a>
      </div>
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

export default VerifyCode;
