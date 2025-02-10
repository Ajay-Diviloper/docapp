const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./confing/db");
const path = require("path"); // This will allow us to serve static files

//dotenv config
dotenv.config();

// MongoDB connection
connectdb();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", require("./routes/userroutes"));
app.use("/api/admin", require("./routes/adminroutes"));
app.use("/api/doctor", require("./routes/Doctorroutes"));

// Serve static files from the "build" folder (frontend)
app.use(express.static(path.join(__dirname, "./client/build")));

// For any route that doesn't match the API paths, serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// Home route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to e-commerce app run");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
