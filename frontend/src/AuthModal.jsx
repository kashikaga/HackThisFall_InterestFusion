import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setPassword("");
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (username.trim() && password.trim()) {
      localStorage.setItem("username", username);
      onAuthSuccess(username);
      onClose();
    }
  };

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
            onClick={onClose}
          >
            <X size={20} />
          </button>
          
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                isLogin ? "text-blue-400" : "text-gray-400"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                !isLogin ? "text-blue-400" : "text-gray-400"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 rounded-lg bg-[#272F3E] text-white focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded-lg bg-[#272F3E] text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg w-full"
            onClick={handleAuth}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </motion.div>
      </motion.div>
    )
  );
};

export default AuthModal;
