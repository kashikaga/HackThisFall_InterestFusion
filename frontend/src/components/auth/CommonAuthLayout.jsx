import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function CommonAuthLayout(props) {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex-1  mt-4">
        <Link to="/" className="btn btn-ghost ml-8 text-xl">
          👩‍💻 InterestFusion
        </Link>
      </div>
      <div className="flex mx-16 lg:mx-32 justify-between">
        {/* Forget passord component */}
        <dev className="flex flex-col justify-start mt-12   w-full lg:w-4/12 ">
          <div
            className="flex items-center  "
            onClick={props.backButtonOnClick}
            style={{ cursor: "pointer" }}
          >
            <IoIosArrowBack className="h-5 w-5 mr-1" />
            {props.backButtonName}
          </div>
          <p className="text-3xl font-semibold my-4">{props.title}</p>
          <p>{props.details}</p>

          {props.children}
          <button
            type="submit"
            onClick={props.submitButtonOnClick}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            {props.submitButtonName}
          </button>
        </dev>
        <img
          src={props.image}
          className="h-[550px]  w-[600px] hidden  lg:block  "
        />
      </div>
    </div>
  );
}

export default CommonAuthLayout;
