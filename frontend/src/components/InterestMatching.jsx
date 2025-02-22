import React, { useState } from "react";

const InterestMatching = () => {
  const [userInterest, setUserInterest] = useState("");
  const [matches, setMatches] = useState([]);

  // Mock data: list of users with interests
  const users = [
    { id: 1, name: "Alice", interests: ["Coding", "Reading", "Gaming"] },
    { id: 2, name: "Bob", interests: ["Music", "Sports", "Coding"] },
    { id: 3, name: "Charlie", interests: ["Gaming", "Traveling", "Reading"] },
    { id: 4, name: "Diana", interests: ["Cooking", "Coding", "Music"] },
  ];

  // Function to handle interest matching
  const findMatches = () => {
    const matchedUsers = users.filter((user) =>
      user.interests.includes(userInterest)
    );
    setMatches(matchedUsers);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center py-4 mb-6">
        <h1 className="text-2xl font-bold">Interest Matching</h1>
        <p className="text-sm">Find people who share your interests!</p>
      </header>

      {/* Interest Input Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Your Interest</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            value={userInterest}
            onChange={(e) => setUserInterest(e.target.value)}
            placeholder="e.g., Coding, Music, Gaming"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={findMatches}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Find Matches
          </button>
        </div>
      </section>

      {/* Matches Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Matched Users</h2>
        {matches.length > 0 ? (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li
                key={match.id}
                className="bg-gray-100 border rounded-lg p-4 shadow-md"
              >
                <h3 className="text-lg font-bold">{match.name}</h3>
                <p className="text-gray-700">
                  Interests: {match.interests.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No matches found. Try another interest!</p>
        )}
      </section>
    </div>
  );
};

export default InterestMatching;
