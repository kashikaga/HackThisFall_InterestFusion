import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-gray-900 text-white">
      <div className="max-w-6xl w-full shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden bg-gray-800">
        {/* Left Section for Image (Hidden on Mobile) */}
        <div className="w-full md:w-2/5 bg-gray-700 p-6 hidden md:flex flex-col items-center">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg"
            alt="Privacy Illustration"
            className="w-full rounded-lg mb-4"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau28_GXYA1DEeVWt14zMA4ztRzKvdUXcpCf15AjTFCdyArIopLUos_Bk9MF1WYA8vwU4&usqp=CAU"
            alt="Privacy Illustration"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Section - Privacy Policy Content */}
        <div className="w-full md:w-3/5 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-500">
            Privacy Policy - Interest Fusion
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Introduction
            </h2>
            <p className="text-gray-300">
              Welcome to <span className="font-medium">Interest Fusion</span>, an innovative platform designed to enhance mental well-being by fostering meaningful connections through shared interests. Your privacy and data security are our top priorities. This policy outlines how we collect, use, and protect your information.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>Profile Data:</strong> Customizable interest tags, authenticated profiles, and user preferences.</li>
              <li><strong>Authentication Information:</strong> OTP verification via Vonage API and SSN-based user authentication.</li>
              <li><strong>Interaction Data:</strong> Connections made, messages exchanged, and engagement with features.</li>
            </ul>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>Interest-Based Matching:</strong> Suggesting connections based on shared interests while preserving privacy.</li>
              <li><strong>Secure Communication:</strong> Encrypted messaging and group chats based on common interests.</li>
              <li><strong>User Safety & Verification:</strong> AI-powered moderation, real-time suspicious activity detection, and encrypted storage.</li>
            </ul>
          </section>

          {/* Data Security Measures */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Data Security Measures
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>OTP Verification:</strong> Ensuring account authenticity via Vonage API.</li>
              <li><strong>Encryption:</strong> Storing sensitive data in an encrypted format to prevent unauthorized access.</li>
              <li><strong>AI Moderation:</strong> Monitoring and filtering content to maintain a safe community.</li>
            </ul>
          </section>

          {/* Your Rights & Choices */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Your Rights & Choices
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>Access & Update Information:</strong> Modify your profile and preferences anytime.</li>
              <li><strong>Data Deletion Requests:</strong> Users can request to delete their accounts and associated data.</li>
              <li><strong>Cookie & Tracking Controls:</strong> Customize cookie preferences for a personalized experience.</li>
            </ul>
          </section>

          {/* Future Enhancements */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Future Enhancements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>Scalability & Performance Optimization:</strong> Enhancing database efficiency and load balancing.</li>
              <li><strong>Advanced User Verification:</strong> Strengthening authentication mechanisms.</li>
              <li><strong>Enhanced Privacy Controls:</strong> Providing more granular user settings for privacy management.</li>
            </ul>
          </section>

          {/* Contact Info */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
              Contact Us
            </h2>
            <p className="text-gray-400">
              📧 <strong>contact@interestfusion.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
