import React, { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions.",
    },
    {
      id: 2,
      question: "Where can I find my account settings?",
      answer: "You can access your account settings by clicking on your profile picture in the top-right corner of the page.",
    },
    {
      id: 3,
      question: "How do I contact customer support?",
      answer: "You can contact us via the support form on the Support page or email us at support@example.com.",
    },
    {
      id: 4,
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address in the Account Settings section under 'Personal Information'.",
    },
    {
      id: 5,
      question: "What is your refund policy?",
      answer: "Our refund policy can be found on the Terms and Conditions page. Generally, refunds are processed within 7-10 business days.",
    },
  ];

  // Filter FAQs based on the search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center py-4 mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <p className="text-sm">Find answers to common questions below.</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white shadow-lg rounded-lg p-4 border"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(faq.id)}
              >
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <button className="text-blue-500">
                  {expandedQuestion === faq.id ? "−" : "+"}
                </button>
              </div>
              {expandedQuestion === faq.id && (
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No questions found. Try a different search term.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
