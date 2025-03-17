import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

const StudyGroup = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

// Redirect if token is missing or invalid
useEffect(() => {
  const token = localStorage.getItem("u_token");

  if (!token) {
    window.location.href = "/community";
    return;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded || !decoded.id) {
      localStorage.removeItem("u_token");
      window.location.href = "/community";
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("u_token");
    window.location.href = "/community";
  }
}, []);

// Fetch groups on mount with cancellation
useEffect(() => {
  let isMounted = true;

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      if (isMounted) {
        setGroups(response.data);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  fetchGroups();

  return () => {
    isMounted = false;
  };
}, []);


  // Function to handle creating a new group
  const addGroup = async (group) => {
    try {
      console.log("Creating group:", group);
      const response = await axios.post(`${BASE_URL}/create`, group);
      setGroups([...groups, response.data]); // Add new group to the state
      setIsModalOpen(false);
      window.location.reload()
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-6 shadow-lg">
        <h1 className="text-3xl font-bold">Study Groups</h1>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Available Groups Section */}
        <section id="groups" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-purple-300">
              Available Groups
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              Create Group
            </motion.button>
          </div>
          <GroupList groups={groups} />
        </section>
      </main>

      {/* Modal for Creating Group */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateGroupForm addGroup={addGroup} />
        </Modal>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 border border-purple-400 rounded-lg shadow-lg p-6 relative w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};


const GroupList = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.length > 0 ? (
        groups.map((group) => (
          <motion.div
            key={group._id}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <GroupCard group={group} />
          </motion.div>
        ))
      ) : (
        <motion.p
          className="text-gray-400 text-center col-span-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No groups available. Create one!
        </motion.p>
      )}
    </div>
  );
};




const GroupCard = ({ group }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-6 
                 hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
    >
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg 
                      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                      before:from-purple-500 before:to-blue-500 before:blur-lg before:opacity-0 
                      hover:before:opacity-100 hover:before:animate-pulse transition-opacity duration-500" 
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-purple-400">{group.name}</h3>
        <p className="text-gray-300 mb-4">{group.description}</p>
        <span className="text-sm text-blue-400 font-medium">
          Topic: {group.tag}
        </span>
      </div>
    </motion.div>
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
      u_id: jwtDecode(localStorage.getItem("u_token")).id,
      name: groupName,
      description: groupDescription,
      tag: groupTopic,
    });

    // Clear the form
    setGroupName("");
    setGroupDescription("");
    setGroupTopic("Math");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-purple-400 rounded-lg shadow-lg p-6 space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">
        Create a New Study Group
      </h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
        required
      />
      <textarea
        placeholder="Group Description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
        required
      ></textarea>
      <select
        value={groupTopic}
        onChange={(e) => setGroupTopic(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
      >
        <option value="Math">Math</option>
        <option value="Programming">Programming</option>
        <option value="DSA">DSA</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
      >
        Create Group
      </motion.button>
    </motion.form>
  );
};

export default StudyGroup;
