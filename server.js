const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db");
const transporter = require("./config/emailConfig");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const session = require('express-session'); // Add this line
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(authRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/protected", authenticateToken, (req, res) => {
  res.send("You are authorized");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});