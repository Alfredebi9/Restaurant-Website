const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db");
const transporter = require("./config/emailConfig");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set the correct MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.set('Content-Type', 'text/css');
  }
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", authRoutes);



app.get("/protected", authenticateToken, (req, res) => {
  res.send("You are authorized");
});

// Start the server
// module.exports = app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
