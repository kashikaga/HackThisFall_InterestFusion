import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        rotate: 1,
        boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.6)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-gray-900 border border-purple-500 rounded-xl shadow-lg p-5 overflow-hidden"
    >
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-purple-700 opacity-20 blur-xl"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-transparent to-black opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-extrabold text-purple-300 tracking-wider drop-shadow-lg">
          {event.title}
        </h3>
        <p className="text-gray-300 mt-2 text-sm">{event.description}</p>
        <p className="text-gray-300 mt-2 text-sm">{event.location}</p>
        <span className="text-sm text-purple-400 font-medium mt-3 block">
          📅 {event.date}
        </span>
      </div>

      {/* Bottom Glow Animation */}
      <motion.div
        className="absolute -bottom-2 left-1/2 w-4/5 h-1 rounded-full bg-purple-500 blur-lg opacity-60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
};

export default EventCard;
