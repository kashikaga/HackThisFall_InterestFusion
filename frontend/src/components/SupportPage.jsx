import React, { useState } from "react";
import { motion } from "framer-motion";

const SupportPage = () => {
  const [ticket, setTicket] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      console.log("Support Ticket Submitted: ", ticket);
      setTicket({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white text-center py-6 shadow-lg w-full border-b border-gray-700"
      >
        <h1 className="text-4xl font-extrabold tracking-wide">Support Center</h1>
        <p className="text-md mt-1 font-light">How can we help you today?</p>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-6 max-w-3xl mx-auto w-full"
      >
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>
          {submitted && (
            <motion.p 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-green-400 font-medium mb-4"
            >
              ✅ Thank you! Your ticket has been submitted.
            </motion.p>
          )}
          <SupportForm ticket={ticket} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
        </section>

        <motion.section
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <FAQ />
        </motion.section>

        <motion.section
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
          <SupportTopics />
        </motion.section>
      </motion.main>
    </div>
  );
};

const SupportForm = ({ ticket, handleChange, handleSubmit, loading }) => {
  return (
    <motion.form 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-4"
    >
      <input type="text" name="name" placeholder="Your Name" value={ticket.name} onChange={handleChange} className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400" required />
      <input type="email" name="email" placeholder="Your Email" value={ticket.email} onChange={handleChange} className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400" required />
      <textarea name="message" placeholder="Describe your issue" value={ticket.message} onChange={handleChange} className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400" required></textarea>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        type="submit" disabled={loading} 
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:bg-gray-500"
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </motion.button>
    </motion.form>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to the login page and click 'Forgot Password'." },
    { question: "Where can I find my invoices?", answer: "Invoices are available in your account dashboard under 'Billing'." },
    { question: "How do I contact support?", answer: "You can fill out the support form or email us at support@example.com." },
  ];

  return (
    <div>
      {faqs.map((faq, index) => (
        <motion.details 
          key={index} 
          className="bg-gray-700 border rounded-lg p-4 shadow-md mb-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <summary className="font-bold text-white">{faq.question}</summary>
          <p className="text-gray-300 mt-2">{faq.answer}</p>
        </motion.details>
      ))}
    </div>
  );
};

const SupportTopics = () => {
  const topics = ["Account Issues", "Payment Problems", "Technical Support", "Product Questions", "General Inquiries"];

  return (
    <div className="flex flex-wrap gap-4">
      {topics.map((topic, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)" }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 cursor-pointer transition"
        >
          {topic}
        </motion.div>
      ))}
    </div>
  );
};

export default SupportPage;
