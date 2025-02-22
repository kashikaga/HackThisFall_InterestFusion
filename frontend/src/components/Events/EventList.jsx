import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for pagination
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;

  // Pagination logic
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const displayedEvents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <div className="flex flex-col items-center">
      {/* Event Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* <EventCard event={event} /> */}
              <EventCard event={event} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No events available. Create one!</p>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`p-2 rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="text-white" />
          </button>
          <span className="text-white text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`p-2 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

// Sample EventCard for Reference
// const EventCard = ({ event }) => {
//   return (
//     <div className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-5">
//       <h3 className="text-xl font-bold mb-2 text-purple-300">{event.title}</h3>
//       <p className="text-gray-300 mb-2">{event.description}</p>
//       <span className="text-sm text-purple-400 font-medium">Date: {event.date}</span>
//     </div>
//   );
// };

export default EventList;
