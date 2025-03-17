import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("u_token");
    if (!token) {
      setIsAuthModalOpen(true);
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getposts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAuth = () => {
    if (uname && password) {
      axios.post(`${BASE_URL}/fusionauth`, { uname, password })
        .then((res) => {
          localStorage.setItem("u_token", res.data.token);
          setIsAuthModalOpen(false);
          fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePost = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("u_token");
      if (!token) {
        console.error("No authentication token found.");
        alert("Please log in to post.");
        setIsPosting(false);
        return;
      }
  
      // Decode token to get user ID
      let decode;
      try {
        decode = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Session expired. Please log in again.");
        setIsPosting(false);
        return;
      }
  
      // Prepare post payload
      const postData = { userId: decode.id, title, content };
  
      // Send request with token authorization
      const response = await axios.post(`${BASE_URL}/fusionpublish`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Success response handling
      if (response.status === 201 || response.status === 200) {
        console.log("Post added successfully:", response.data);
        setIsModalOpen(false);
        setTitle("");
        setContent("");
        fetchPosts();
      } else {
        console.warn("Unexpected response status:", response.status);
        alert("Failed to post. Please try again.");
      }
    } catch (err) {
      console.error("Error adding post:", err);
      alert("An error occurred while posting. Please check your connection and try again.");
    } finally {
      setIsPosting(false); // Reset loading state
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
      <input 
        type="text" 
        className="w-full p-2 rounded-lg bg-[#272F3E] text-white mb-2" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        className="w-full p-2 rounded-lg bg-[#272F3E] text-white mb-2" 
        placeholder="Write something..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg w-full" 
        onClick={handlePost}
      >
        Post
      </motion.button>
    </motion.div>
  </motion.div>
)}

      <div className="mt-6 w-full max-w-2xl">
        {posts.map((post) => (
          <motion.div key={post.id} className="bg-[#19202E] text-white p-4 mb-4 rounded-lg shadow">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
          </motion.div>
        ))}
      </div>
      
      {isAuthModalOpen && (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.9 }} 
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
        className="w-full p-2 mb-2 rounded-lg bg-[#272F3E] text-white"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full p-2 mb-2 rounded-lg bg-[#272F3E] text-white"
      />
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg w-full" 
        onClick={handleAuth}
      >
        Continue
      </motion.button>
    </motion.div>
  </motion.div>
)}

    </motion.div>
  );
};

export default Community;
