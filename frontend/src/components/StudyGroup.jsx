import React, { useState } from "react";

const StudyGroup = () => {
  const [groups, setGroups] = useState([]);

  // Function to handle creating a new group
  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-green-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Study Groups</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Available Groups Section */}
        <section id="groups" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Groups</h2>
          <GroupList groups={groups} />
        </section>

        {/* Create Group Section */}
        <section id="create-group">
          <h2 className="text-xl font-semibold mb-4">Create a New Study Group</h2>
          <CreateGroupForm addGroup={addGroup} />
        </section>
      </main>
    </div>
  );
};

// Component to display the list of groups
const GroupList = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.length > 0 ? (
        groups.map((group, index) => <GroupCard key={index} group={group} />)
      ) : (
        <p className="text-gray-600">No groups available. Create one!</p>
      )}
    </div>
  );
};

// Component to display a single group card
const GroupCard = ({ group }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold mb-2">{group.name}</h3>
      <p className="text-gray-700 mb-2">{group.description}</p>
      <span className="text-sm text-green-600 font-medium">
        Topic: {group.topic}
      </span>
    </div>
  );
};

// Component for the "Create Group" form
const CreateGroupForm = ({ addGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupTopic, setGroupTopic] = useState("Math");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new group
    addGroup({
      name: groupName,
      description: groupDescription,
      topic: groupTopic,
    });

    // Clear the form
    setGroupName("");
    setGroupDescription("");
    setGroupTopic("Math");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-lg p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
        required
      />
      <textarea
        placeholder="Group Description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
        required
      ></textarea>
      <select
        value={groupTopic}
        onChange={(e) => setGroupTopic(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
      >
        <option value="Math">Math</option>
        <option value="Programming">Programming</option>
        <option value="DSA">DSA</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Create Group
      </button>
    </form>
  );
};

export default StudyGroup;
