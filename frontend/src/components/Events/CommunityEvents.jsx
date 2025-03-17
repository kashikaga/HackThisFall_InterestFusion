import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventList from "./EventList";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const CommunityEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("u_token") === null){
      window.location.href = `/community`
    }
  },[])

  useEffect(() => {
    const fetchevents = async () => {
      const resp = await axios.get("http://localhost:7777/allevents");
      console.log(resp.data)
      setEvents(resp.data.events)
    }
    fetchevents()
  }, [])
  

  const addEvent = async(event) => {
    console.log(event)
    const eventdata = {
      u_id: (jwtDecode(localStorage.getItem("u_token"))).id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location
    }
    const resp = await axios.post("http://localhost:7777/createevent", eventdata);
    console.log(resp.data)
    setEvents([...events, event]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
      <Header/>
      <main className="py-8 flex flex-col items-center">
        <CommunityCard 
          title="Join Our Weekly Tech Meetup!"
          description="Connect with like-minded developers, discuss the latest trends, and build awesome projects together!"
          date="Every Saturday at 6 PM"
        />

        <section id="events" className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Upcoming Events</h2>
          {/* <EventList events={events} /> */}
            <EventList events={events}/>
        </section>

        <section id="create-event" className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Create a New Event</h2>
          <CreateEventForm addEvent={addEvent} />
        </section>
      </main>
    </div>
  );
};

// const EventList = ({ events }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {events.length > 0 ? (
//         events.map((event, index) => <EventCard key={index} event={event} />)
//       ) : (
//         <p className="text-gray-400 text-center">No events available. Create one!</p>
//       )}
//     </div>
//   );
// };

// const EventCard = ({ event }) => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//       whileHover={{ scale: 1.05 }}
//       className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-5 text-center max-w-md mx-auto"
//     >
//       <h3 className="text-xl font-bold mb-2 text-purple-300">{event.title}</h3>
//       <p className="text-gray-300 mb-2">{event.description}</p>
//       <span className="text-sm text-purple-400 font-medium">Date: {event.date}</span>
//     </motion.div>
//   );
// };


const Header = () => {
  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed h-16 top-4 w-[90%] md:w-[80%] bg-opacity-30 backdrop-blur-xl bg-gray-900/80 border border-gray-700 shadow-lg rounded-full py-3 px-6 flex justify-between items-center z-50"
      >
        <h2 className="text-xl font-bold text-purple-300 tracking-wide">✨ Events Hub</h2>
        <ul className="flex space-x-6 text-gray-300 text-sm">
          {["Home", "Events", "Profile"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#d8b4fe" }}
              className="cursor-pointer transition"
            >
              {item}
            </motion.li>
          ))}
                      <motion.li
              whileHover={{ scale: 1.1, color: "#d8b4fe" }}
              className="cursor-pointer transition"
              
            >
              <a href="#create-event"></a>
              Create
            </motion.li>
        </ul>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mt-32 bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-10 px-8 text-center shadow-2xl rounded-xl w-[90%] md:w-[80%]"
      >
        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          🚀 Community Events Hub
        </h1>
        <p className="text-lg text-gray-200 mt-3">
          Connect, Collaborate, and Create Awesome Moments! ✨
        </p>

        {/* Subtle Neon Glow */}
        <motion.div
          className="absolute inset-0 bg-purple-500 opacity-20 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        ></motion.div>
      </motion.header>
    </div>
  );
};


const CreateEventForm = ({ addEvent }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addEvent({ title: eventTitle, description: eventDescription, date: eventDate, location: eventLocation });
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-6 space-y-4 max-w-md mx-auto"
    >
      <input 
        type="text" placeholder="Event Title" value={eventTitle} 
        onChange={(e) => setEventTitle(e.target.value)} 
        className="w-full p-3 border rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400" required 
      />
      <textarea 
        placeholder="Event Description" value={eventDescription} 
        onChange={(e) => setEventDescription(e.target.value)} 
        className="w-full p-3 border rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400" required
      ></textarea>
      <input 
        type="date" value={eventDate} 
        onChange={(e) => setEventDate(e.target.value)} 
        className="w-full p-3 border rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400" required
      />
      <input 
        type="text" value={eventLocation} 
        onChange={(e) => setEventLocation(e.target.value)} 
        className="w-full p-3 border rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400" required
        placeholder="Event Location"
      />
      <motion.button 
        type="submit" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Add Event
      </motion.button>
    </motion.form>
  );
};

const CommunityCard = ({ title, description, date, location }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-6 text-center max-w-lg mx-auto mt-6"
    >
      <h3 className="text-2xl font-bold text-purple-300">{title}</h3>
      <p className="text-gray-300 my-2">{description}</p>
      <p className="text-gray-300 my-2">{location}</p>
      <span className="text-sm text-purple-400 font-medium">{date}</span>
      <div></div>
    </motion.div>
  );
};

export default CommunityEvents;
