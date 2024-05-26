const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../config/emailConfig");
const path = require("path");
const crypto = require('crypto');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;


// Function to check password against Have I Been Pwned API
async function checkPwnedPassword(password) {
  const hash = crypto.createHash('sha1').update(password).digest('hex');
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5).toUpperCase();

  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const data = await response.text();

  return data.includes(suffix);
}



// Registration Post action
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for strong password
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      });
    }
    // Check if the password has been pwned
    const isPwned = await checkPwnedPassword(password);
    if (isPwned) {
      return res.status(400).json({ message: "This password has been found in a data breach. Please choose a different password." });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating new user instance
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the user to the database
    await newUser.save();
    const verificationLink = `https://t-house.vercel.app/verify/${newUser._id}`;
    // send verification email
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Email Confirmation - 🍽BiteBuzz`,
      html: `<h1>Welcome to 🍽BiteBuzz</h1> Click the link below to verify your email <br> <a href="${verificationLink}">${verificationLink}</a>`,
    };
    // Function to send email using nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        console.log(error);
        return res
          .status(500)
          .json({ message: "Error sending verification email" });
      } else {
        console.log("Verification email sent: " + info.response);
        console.log(info.accepted);
        console.log(info.rejected);
        const loginPage = "/login";
        return res.json({
          message: "Verification email sent",
          redirect: loginPage,
        });
      }
    });
    console.log(`Email sent: ${process.env.EMAIL_USER}`);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error registering user" + error.message });
  }
});

// login POST function
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (!user.verified) {
        return res.status(401).json({
          message:
            "Email not verified. Please verify your email before logging in.",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.cookie("username", user.username, { path: "/" });
        const returnTo = req.session.returnTo || "/";
        return res.json({ message: "Login successful", redirect: returnTo });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
});

// reset password POST function
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's password with the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "password updated", redirect: "/login" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate a password reset token and send it to the user's email
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = ` https://t-house.vercel.app/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `Click the link below to reset your password, it expires in 1hr <br> <a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending password reset email");
      } else {
        console.log("Password reset email sent: " + info.response);
        res.json({ message: "Password reset instructions sent to your email" });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing password reset request" });
  }
});

// booking form route
router.post("/submit-form", (req, res) => {
  //getting data from input
  const { name, email, people_No, message } = req.body;
  const mailOptions = {
    from: "alfredsalvadorfav@gmail.com",
    to: EMAIL_USER,
    subject: "New Booking Request",
    html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>No Of People:</strong> ${people_No}</p>
          <p><strong>Special Request:</strong> ${message}</p>
          `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: `Error: unable to book meal` });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ message: `Booking request submitted successfully` });
    }
  });
});

// contact-us form route
router.post("/contact-form", (req, res) => {
  //get data from input
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: "alfredsalvadorfav@gmail.com",
    to: EMAIL_USER,
    subject: "New Service Request", // subject line
    html: `
          <h2>New Service Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Request:</strong> ${message}</p>
          `,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: `Error: unable to book meal` });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ message: `Request submitted successfully` });
    }
  });
});

// newsletter form route

router.post("/news-form", (req, res) => {
  //get data from input
  const { email } = req.body;
  console.log(email);

  // Check if the email is extracted correctly
  if (!email) {
    console.error("No email address provided");
    return res.status(400).json({ message: "No email address provided" });
  }

  console.log("Email to send confirmation to:", email);

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Newsletter Subscription Confirmation",
    html: `
      <h2>Thank you for subscribing to our newsletter!</h2>
      <p>We have successfully received your request to subscribe to our newsletter using the email address ${email}. You will now receive regular updates and news from us.</p>
      <p>Thank you!</p>
    `,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: `Error: unable to send request` });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ message: `news letter request submitted successfully` });
    }
  });

  const adminMailOptions = {
    from: "alfredsalvadorfav@gmail.com",
    to: EMAIL_USER,
    subject: "News letter Request", // subject line
    html: `
          <h2>News letter Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          `,
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: `Error: unable to book meal` });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ message: `news letter request submitted successfully` });
    }
  });
});

// Email Verification route
router.get("/verify/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Set the user's verification to true
    user.verified = true;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying email");
  }
});

// forgot password route
router.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "forgot-password.html"));
});

// reset password route logic
router.get("/reset-password", (req, res) => {
  const token = req.query.token;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send("Invalid or expired token. Please try again.");
    }
    res.sendFile(path.join(__dirname, "..", "public", "reset-password.html"));
  });
});

// Serve registration page
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});

// Serve as login page
router.get("/login", (req, res) => {
  // store previous url in session
  const lastVisitedPage = req.headers.referer;
  console.log(lastVisitedPage);
  if (
    lastVisitedPage &&
    (lastVisitedPage.endsWith("/register") ||
      lastVisitedPage.endsWith("/reset-password") ||
      lastVisitedPage.endsWith("/verify/:userId") ||
      lastVisitedPage.endsWith("/forgot-password"))
  ) {
    req.session.returnTo = null; // Reset returnTo if last visited page was register
  } else {
    req.session.returnTo = lastVisitedPage;
  }
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  const username = req.cookies.username;
  if (token && username) {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      next();
    });
  } else {
    return res.redirect("/login");
  }
};

// Serve as about page
router.get("/about", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "about.html"));
});

// Serve as booking page
router.get("/booking", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "booking.html"));
});

// Serve as contact-us page
router.get("/contact", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "contact-us.html"));
});

// Serve as menu page
router.get("/menu", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "menu.html"));
});

// Serve as legal page
router.get("/legal", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "legal.html"));
});

// route for logging out
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.redirect("/login");
});

// Serve as home page or login page based on authentication status
router.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = router;
