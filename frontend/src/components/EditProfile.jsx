import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(null);

  const [allTags, setAllTags] = useState({ tags: [...user.skills] });
  function handleChange(tags) {
    setAllTags({ tags });
  }
  const saveProfile = async () => {
    // Clear Errors
    setError("");
    try {
      if (!["male", "female", "other"].includes(gender)) {
        setShowToast("Enter a valid Gender type");
        setTimeout(() => {
          setShowToast(null);
        }, 5000);
        return;
      }
      if (allTags.tags.length < 3) {
        setShowToast("Minimum 3 tags are required");
        setTimeout(() => {
          setShowToast("Hint: tags can be games, cooking, coding");
          setTimeout(() => {
            setShowToast(null);
          }, 5000);
        }, 3000);
        return;
      }
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: allTags.tags,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast("Profile Saved Successfully");
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <form>
                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">First Name:</span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">Last Name:</span>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">Photo URL:</span>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">Age:</span>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">Gender:</span>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <span className="label-text">About:</span>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
                <TagsInput
                  className="w-full mb-10 mt-2  px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={allTags.tags}
                  onChange={handleChange}
                />

                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={saveProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills: user.skills,
            matchingSkills: user.matchingSkills,
          }}
        />
      </div>
      {showToast != null && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{showToast}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
