import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqs = [
    { id: 1, question: "How do I reset my password?", answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions." },
    { id: 2, question: "Where can I find my account settings?", answer: "You can access your account settings by clicking on your profile picture in the top-right corner of the page." },
    { id: 3, question: "How do I contact customer support?", answer: "You can contact us via the support form on the Support page or email us at support@example.com." },
    { id: 4, question: "Can I change my email address?", answer: "Yes, you can update your email address in the Account Settings section under 'Personal Information'." },
    { id: 5, question: "What is your refund policy?", answer: "Our refund policy can be found on the Terms and Conditions page. Generally, refunds are processed within 7-10 business days." },
    { id: 6, question: "How do I update my profile picture?", answer: "You can update your profile picture from your account settings under the 'Profile' section." },
    { id: 7, question: "Do you offer a free trial?", answer: "Yes, we offer a 7-day free trial for new users. You can sign up and access all premium features during this period." },
    { id: 8, question: "Can I cancel my subscription anytime?", answer: "Yes, you can cancel your subscription anytime from the billing section of your account settings." },
    { id: 9, question: "How do I change my payment method?", answer: "To change your payment method, go to the 'Billing' section in your account settings and update your payment details." },
    { id: 10, question: "Is my data secure?", answer: "Yes, we prioritize data security with encryption and comply with industry standards to protect your information." }
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-200 flex flex-col items-center">
      <header className="text-center py-6">
        <motion.h1
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Find answers to common questions below.
        </motion.p>
      </header>
      
      <motion.div
        className="max-w-lg w-full mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:ring-2 focus:ring-purple-500"
        />
      </motion.div>
      
      <div className="max-w-2xl w-full space-y-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 text-gray-300 p-4 rounded-lg shadow-lg cursor-pointer border border-gray-700 hover:bg-gray-700"
              onClick={() => toggleExpand(faq.id)}
            >
              <div className="flex justify-between items-center">
                <motion.h2 className="text-lg font-semibold text-purple-400">
                  {faq.question}
                </motion.h2>
                <motion.button
                  className="text-purple-400 text-xl"
                  animate={{ rotate: expandedQuestion === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedQuestion === faq.id ? "−" : "+"}
                </motion.button>
              </div>
              <AnimatePresence>
                {expandedQuestion === faq.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-400 mt-2"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No questions found. Try a different search term.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
