require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendEmail = require("../util/sendEmail");
const forgotPasswordEmailTemplate = require("../util/email_templates/forgotPasswordEmailTemplate");
const userSignupSchema = require("../validations/userSignup.validation");

const authController = {
  customerSignup: async (req, res) => {
    try {
      const { name, email, password, profilePic } = req.body;

      // validate request body
      userSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePic,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profilePic: newUser.profilePic,
        },
        message: "User created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // check if user status is suspended
      if (user.status === "suspended") {
        return res.status(403).json({
          success: false,
          message: "Your account has been suspended. Please contact support",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
        },
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Forgot password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

      const emailTemplate = forgotPasswordEmailTemplate(
        user.name,
        resetPasswordLink
      );
      sendEmail(user.email, "Password Reset Requested", emailTemplate);

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(400).json({
            success: false,
            message: "Token expired",
          });
        } else if (error.name === "JsonWebTokenError") {
          return res.status(400).json({
            success: false,
            message: "Invalid token",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid token",
          });
        }
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = authController;
