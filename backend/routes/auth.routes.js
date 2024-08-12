const authRouter = require("express").Router();

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

// TODO add regex to password?
authRouter.post("/signup", async (req, res, next) => {
  const { firstName, password, checkPassword, email } = req.body;
  try {
    if (!firstName || !password || !checkPassword || !email) {
      return res.status(401).json("All fields are required!");
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      res
        .status(401)
        .json(
          "This email is already registered, please log in to access your account."
        );
    }
    if (password !== checkPassword) {
      return res.status(401).json("The passwords are not matching.");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await User.create({
      firstName,
      password: hashedPassword,
      email,
    });

    const { password: userPassword, __v, ...payload } = createUser.toObject();
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    console.log("This is the token", token);
    res.status(200).json({ token: token, payload: payload });
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json("Please enter both email and password.");
      return;
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res
        .status(404)
        .json("No account found with this email. Please try again.");
      return;
    }
    const comparePasswords = await bcrypt.compare(password, findUser.password);
    if (!comparePasswords) {
      res
        .status(401)
        .json("Incorrect password, please double-check and try again.");
      return;
    }

    const { password: userPassword, __v, ...payload } = findUser.toObject();
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).json({ token: token, payload: payload });

    console.log(token);
  } catch (err) {
    console.log(err);
  }
});

authRouter.delete("/user/delete", isAuthenticated, async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.user._id, "am I id");
  try {
    const response = await User.findByIdAndDelete(_id);
    console.log(response, "response");
    if (response) {
      res.status(200).json("User deleted successfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error(`Error deleting user with ID: ${_id}`, err);
    res.status(500).json("Internal server error");
  }
});
authRouter.get("/verify", (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = authRouter;
