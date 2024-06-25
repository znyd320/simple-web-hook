const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const maxRequests = 50;
const requestsStore = [];

// Route to handle POST requests and store the data in memory
app.post("/store", (req, res) => {
  const body = req.body;

  // Check if we have more than 50 requests, remove the oldest one if so
  if (requestsStore.length >= maxRequests) {
    requestsStore.shift();
  }

  // Add the new request body to the store
  let payload = {
    body,
    timestamp: new Date().toISOString(),
  };
  requestsStore.push(payload);

  res.status(201).send({ message: "Request stored successfully!" });
});

// Route to retrieve all stored requests
app.get('/data', (req, res) => {
    let payload = {
        total: requestsStore.length,
        isLatest : true,
        data: requestsStore.reverse(),
    }
    res.status(200).send(payload);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
