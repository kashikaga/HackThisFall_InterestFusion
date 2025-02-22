import React, { useState } from "react";

const SupportPage = () => {
  const [ticket, setTicket] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate form submission (replace with actual API call)
    console.log("Support Ticket Submitted: ", ticket);

    // Clear form
    setTicket({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-sm">How can we help you today?</p>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>
          {submitted && (
            <p className="text-green-600 font-medium mb-4">
              Thank you! Your ticket has been submitted.
            </p>
          )}
          <SupportForm
            ticket={ticket}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <FAQ />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
          <SupportTopics />
        </section>
      </main>
    </div>
  );
};

// Support Form Component
const SupportForm = ({ ticket, handleChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={ticket.name}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={ticket.email}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <textarea
        name="message"
        placeholder="Describe your issue"
        value={ticket.message}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Submit Ticket
      </button>
    </form>
  );
};

// FAQ Component
const FAQ = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to the login page and click 'Forgot Password'." },
    { question: "Where can I find my invoices?", answer: "Invoices are available in your account dashboard under 'Billing'." },
    { question: "How do I contact support?", answer: "You can fill out the support form or email us at support@example.com." },
  ];

  return (
    <ul className="space-y-4">
      {faqs.map((faq, index) => (
        <li key={index} className="bg-gray-100 border rounded-lg p-4 shadow-md">
          <p className="font-bold">{faq.question}</p>
          <p className="text-gray-700">{faq.answer}</p>
        </li>
      ))}
    </ul>
  );
};

// Support Topics Component
const SupportTopics = () => {
  const topics = ["Account Issues", "Payment Problems", "Technical Support", "Product Questions", "General Inquiries"];

  return (
    <div className="flex flex-wrap gap-4">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow hover:bg-blue-200 cursor-pointer"
        >
          {topic}
        </div>
      ))}
    </div>
  );
};

export default SupportPage;
