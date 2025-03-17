import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import TinderCard from "react-tinder-card";

// A simple boredom fighter component that displays a random joke and a button to refresh the feed
const BoredomFighter = ({ onRetry }) => {
  const jokes = [
    "Why don't programmers like nature? Too many bugs.",
    "I would tell you a joke about UDP, but you might not get it.",
    "How many programmers does it take to change a light bulb? None – it's a hardware problem.",
  ];

  // Select a random joke from the list
  const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

  const [joke, setJoke] = useState(getRandomJoke());

  // Refresh the joke when the user clicks the button
  const handleNewJoke = () => {
    setJoke(getRandomJoke());
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-yellow-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Uh oh, feed failed to load!
      </h2>
      <p className="text-gray-700">{joke}</p>
      <div className="flex space-x-2">
        <button
          onClick={handleNewJoke}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Another Joke
        </button>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the feed data from the API
  const getFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      setError("Failed to load feed. Please try again.");
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending requests based on user swipe status
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
      // Optionally, you can set an error state or notify the user here.
    }
  };

  // Determine swipe direction and take action accordingly
  function onSwipe(direction, userId) {
    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else if (direction === "left") {
      handleSendRequest("ignored", userId);
    }
  }

  // Load feed when the component mounts
  useEffect(() => {
    getFeed();
  }, []);

  // Display a loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Display the boredom fighter UI if an error occurred
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BoredomFighter onRetry={getFeed} />
      </div>
    );
  }

  // Inform the user if no users are found
  if (!feed || feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-xl">No new users found!</h1>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      {/* Header with guidance text */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Discover People
        </h1>
        <p className="text-lg text-gray-600">
          Swipe right if you're interested. Swipe left to ignore.
        </p>
      </header>

      {/* Tinder Cards container */}
      <div className="flex justify-center items-center">
        <div className="relative w-[400px] h-[600px]">
          {feed.map((people, index) => (
            <TinderCard
              key={people._id}
              className="absolute"
              onSwipe={(direction) => onSwipe(direction, people._id)}
              preventSwipe={["up", "down"]}
              style={{
                zIndex: feed.length - index,
              }}
            >
              <UserCard user={people} />
            </TinderCard>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Interest Fusion. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Feed;
