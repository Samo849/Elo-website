const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

require("./api/models/db.js"); // connects to database

const apiRouter = require("./api/routes/index");
app.use("/api", apiRouter);


app.use(bodyParser.urlencoded({ extended: false }));


// Define routes
app.get('/',  (req, res) => {
  res.send("Hello");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});