import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-gray-900 text-white">
      <div className="max-w-6xl w-full shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden bg-gray-800">
        {/* Left Section for Image (Hidden on Mobile) */}
        <div className="w-full md:w-2/5 bg-gray-700 p-6 hidden md:flex flex-col items-center">
          <img
            src="https://img.freepik.com/free-vector/terms-service-concept-illustration_114360-1447.jpg"
            alt="Terms Illustration"
            className="w-full rounded-lg mb-4"
          />
        </div>

        {/* Right Section - Terms of Service Content */}
        <div className="w-full md:w-3/5 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-500">
            Interest Fusion - Terms of Service
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Introduction</h2>
            <p className="text-gray-300">
              Welcome to <span className="font-medium">Interest Fusion</span>. By accessing and using our platform, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>You must provide accurate information when registering.</li>
              <li>Respect other users and avoid harassment or hate speech.</li>
              <li>Do not share or distribute harmful content.</li>
              <li>Ensure compliance with all applicable laws while using the platform.</li>
            </ul>
          </section>

          {/* Content Ownership */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Content Ownership</h2>
            <p className="text-gray-300">
              Users retain ownership of the content they post but grant Interest Fusion a license to use, modify, and display their content as necessary for platform operations.
            </p>
          </section>

          {/* Privacy & Security */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Privacy & Security</h2>
            <p className="text-gray-300">
              Our platform takes security seriously. Your data is protected as outlined in our <a href="/privacy-policy" className="text-yellow-400">Privacy Policy</a>.
            </p>
          </section>

          {/* Termination of Access */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Termination of Access</h2>
            <p className="text-gray-300">
              Interest Fusion reserves the right to suspend or terminate accounts violating our terms or engaging in harmful activities.
            </p>
          </section>

          {/* Contact Info */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Contact Us</h2>
            <p className="text-gray-400">
              📧 <strong>support@interestfusion.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
