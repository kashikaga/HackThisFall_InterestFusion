// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Set status code based on the error type or default to 500
    const statusCode = err.statusCode || 500;
  
    // Log the error for debugging purposes (you can use a logger here)
    console.error(err);
  
    // If the error has validation errors, handle it differently
    if (err.validationError) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: err.validationError, // Attach the validation errors here
      });
    }
  
    // Send a standardized error response for other types of errors
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      details: err.details || null, // Include additional error details if necessary
    });
  };
  
  module.exports = errorHandler;
  