import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import SkillComponent from "./SkillComponent";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="w-[400px] h-[600px] flex items-center justify-center  shadow-lg">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2.5 ">
            {user.skills.map((skill) => {
              return (
                <SkillComponent
                  skill={skill}
                  isMatched={
                    user.matchingSkills
                      ? user.matchingSkills.includes(skill)
                      : false
                  }
                />
              );
            })}
            {user.matchingSkills ? (
              user.matchingSkills.length > 0 ? (
                <div className={`rounded-full w-min p-2 border-2  `}>
                  {user.matchingSkills.length}+
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
