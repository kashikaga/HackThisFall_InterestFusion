import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [postText, setPostText] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("u_token");
    if (!token) {
      setIsAuthModalOpen(true);
    }
  }, []);

  const handleAuth = () => {
    if (uname && password) {
      axios.post(`${BASE_URL}/fusionauth`, { uname, password })
      .then((res) => {
        localStorage.setItem("u_token", res.data.token);
        setIsAuthModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handlePost = () => {
    const token = localStorage.getItem("u_token");
    if (postText.trim() && token) {
      axios.post(`${BASE_URL}/addPost`, { text: postText }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log("Post added:", res.data);
        setIsModalOpen(false);
        setPostText("");
      })
      .catch((err) => {
        console.error("Error adding post:", err);
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 1 }}
      className="bg-[#111826] min-h-screen flex flex-col items-center p-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 100 }}
        className="text-3xl font-bold text-[#ffffff] mb-4"
      >
        Welcome to Fusion Community
      </motion.h1>
      
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex items-center gap-2 px-4 py-2 bg-[#19202E] text-white rounded-lg shadow-md hover:bg-[#1D2432] transition"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle size={20} /> Add Your Thought
      </motion.button>
      
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-[#19202E] p-6 rounded-lg shadow-lg w-80 text-white relative"
          >
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-2">Share Your Thought</h2>
            <textarea 
              className="w-full p-2 rounded-lg bg-[#272F3E] text-white focus:outline-none"
              placeholder="Write something..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <button 
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg w-full"
              onClick={handlePost}
            >
              Post
            </button>
          </motion.div>
        </motion.div>
      )}
      
      {isAuthModalOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-[#19202E] p-6 rounded-lg shadow-lg w-80 text-white relative"
          >
            <h2 className="text-lg font-semibold mb-2">Login / Signup</h2>
            <input 
              type="text" 
              placeholder="Username" 
              value={uname} 
              onChange={(e) => setUname(e.target.value)}
              className="w-full p-2 mb-2 rounded-lg bg-[#272F3E] text-white focus:outline-none"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 rounded-lg bg-[#272F3E] text-white focus:outline-none"
            />
            <button 
              className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg w-full"
              onClick={handleAuth}
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Community;
