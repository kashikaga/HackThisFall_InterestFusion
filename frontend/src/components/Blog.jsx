import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: "How to Start with React",
    author: "John Doe",
    date: "2025-02-01",
    content:
      "React is a powerful library for building user interfaces. Start by learning the basics of JSX, components, and state management.",
  },
  {
    id: 2,
    title: "The Importance of Clean Code",
    author: "Jane Smith",
    date: "2025-01-25",
    content:
      "Writing clean code is essential for maintainability and scalability. Learn some key principles to keep your codebase tidy.",
  },
  {
    id: 3,
    title: "10 Tips for Effective Debugging",
    author: "Alice Johnson",
    date: "2025-01-15",
    content:
      "Debugging can be a daunting task. These 10 tips will help you identify and resolve issues in your code more efficiently.",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockBlogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      {/* Header */}
      <header className="bg-purple-700 text-white text-center py-6 mb-6 shadow-lg rounded-xl">
        <motion.h1
          className="text-3xl font-extrabold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>
        <motion.p
          className="text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Explore the latest posts and insights.
        </motion.p>
      </header>

      {/* Main Section */}
      <motion.main
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {selectedPost ? (
          <BlogDetail post={selectedPost} setSelectedPost={setSelectedPost} />
        ) : (
          <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BlogList posts={filteredPosts} setSelectedPost={setSelectedPost} />
          </>
        )}
      </motion.main>
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md bg-gray-800 text-white placeholder-gray-400"
      />
    </motion.div>
  );
};

// BlogList Component with glowing effect
const BlogList = ({ posts, setSelectedPost }) => {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-gray-800 shadow-lg rounded-xl p-6 cursor-pointer border border-transparent hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPost(post)}
          >
            <h2 className="text-2xl font-bold text-purple-400">{post.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              By {post.author} on {post.date}
            </p>
            <p className="text-gray-300 mt-4">{post.content.slice(0, 100)}...</p>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-400">No posts found. Try another search.</p>
      )}
    </motion.div>
  );
};

// BlogDetail Component
const BlogDetail = ({ post, setSelectedPost }) => {
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-xl p-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => setSelectedPost(null)}
        className="text-purple-400 hover:underline mb-4"
        whileHover={{ scale: 1.1 }}
      >
        &larr; Back to Blog List
      </motion.button>
      <motion.h2
        className="text-3xl font-extrabold text-purple-400 mb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {post.title}
      </motion.h2>
      <p className="text-gray-400 text-sm mb-4">
        By {post.author} on {post.date}
      </p>
      <motion.p
        className="text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {post.content}
      </motion.p>
    </motion.div>
  );
};

export default Blog;
