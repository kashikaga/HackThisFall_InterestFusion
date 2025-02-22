// controllers/metricsController.js
const client = require("prom-client");

// Fetch Prometheus metrics
const getMetrics = async (req, res,next) => {
  try {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMetrics,
};
