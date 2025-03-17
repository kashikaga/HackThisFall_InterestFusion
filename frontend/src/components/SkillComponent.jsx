import React from "react";

function SkillComponent(skill) {
  return (
    <div
      className={`rounded-md w-min p-2 border-2 ${
        skill.isMatched ? "border-green-500" : "border-[#dc7850]"
      } `}
    >
      {skill["skill"]}
    </div>
  );
}

export default SkillComponent;
