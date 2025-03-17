const { FusionEvent } = require('../models/fusionEvent.js');

/**
 * Controller to create a new event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createEvent = async (req, res) => {
  try {
    // Extracting user ID and event details from request body
    const { u_id } = req.body;
    const { title, date, description, location } = req.body;

    // Validation: Check if all required fields are provided
    if (!title || !date || !description || !location) {
      return res.status(400).json({
        message: 'Please fill in all required fields: title, date, description, and location',
      });
    }

    // Creating a new event instance
    const newEvent = new FusionEvent({
      title: title,
      date: new Date(date), // Ensuring the date is stored as a valid Date object
      description: description,
      location: location,
      image: '', // Default to an empty string if no image is provided
      createdBy: u_id,
    });

    // Saving the new event to the database
    await newEvent.save();

    // Responding with success message and the created event object
    return res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({
      message: 'Failed to create event due to a server error',
      error: error.message,
    });
  }
};

/**
 * Controller to retrieve all events from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllEvents = async (req, res) => {
  try {
    // Fetch all events and populate createdBy field with user details
    const events = await FusionEvent.find({})
      .populate('createdBy', 'name email') // Populate with selected fields from User model
      .sort({ createdAt: -1 }); // Sort by newest events first

    // Respond with the list of events
    return res.status(200).json({
      message: 'Events retrieved successfully',
      events: events,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({
      message: 'Failed to fetch events from the database',
      error: error.message,
    });
  }
};

/**
 * Controller to delete an event by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Find and delete the event by ID
    const deletedEvent = await FusionEvent.findByIdAndDelete(id);

    // If event doesn't exist
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found with the provided ID' });
    }

    // Successful deletion response
    return res.status(200).json({
      message: 'Event deleted successfully',
      deletedEvent: deletedEvent,
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({
      message: 'Failed to delete event due to a server error',
      error: error.message,
    });
  }
};

// Export all controllers
module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
};
