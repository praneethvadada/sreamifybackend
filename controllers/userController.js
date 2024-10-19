const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    // Log the incoming request body
    console.log("Register Request Body:", req.body);

    const { name: username, password, email } = req.body;
    console.log("Extracted Username:", username);
    console.log("Extracted Email:", email);

    // Check if the same username exists
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      console.log("Username already used:", username);
      return res.json({ msg: "Username already used", status: false });
    } else {
      console.log("Username is available.");
    }

    // Check if the same email exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("Email already used:", email);
      return res.json({ msg: "Email already used", status: false });
    } else {
      console.log("Email is available.");
    }

    // Create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    console.log("New User Created:", user);

    const userDetails = {
      name: user.username,
      _id: user._id,
    };

    const secretKey = "SSC";
    const payload = {
      userDetails,
    };

    const jwtToken = await jwt.sign(payload, secretKey);
    console.log("Generated JWT Token:", jwtToken);

    return res.json({ status: true, jwtToken, userDetails });
  } catch (error) {
    console.error("Registration Error:", error); // Log the error stack
    return res.json({ msg: "Server issue :(", status: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // Log the incoming request body
    console.log("Login Request Body:", req.body);

    const { email, password } = req.body;
    console.log("Extracted Email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Email is not registered:", email);
      return res.json({ msg: "Email is not registered!", status: false });
    } else {
      console.log("User found:", user);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Valid:", isPasswordValid);
    if (!isPasswordValid) {
      console.log("Incorrect Password for Email:", email);
      return res.json({ msg: "Incorrect Password :(", status: false });
    }

    const userDetails = {
      username: user.username,
      _id: user._id,
    };

    const secretKey = "SSC";
    const payload = {
      userDetails,
    };

    const jwtToken = await jwt.sign(payload, secretKey);
    console.log("Generated JWT Token:", jwtToken);

    return res.json({ status: true, jwtToken, userDetails });
  } catch (error) {
    console.error("Login Error:", error); // Log the error stack
    return res.json({ msg: "Server issue :(", status: false });
  }
};

// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// module.exports.register = async (req, res, next) => {
//   try {
//     const { name: username, password, email } = req.body;
//     console.log(username);
//     //check that is there a same username exits
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck) {
//       return res.json({ msg: "Username already used", status: false });
//     }

//     //check that is there a same email exists
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck) {
//       return res.json({ msg: "Email already used", status: false });
//     }

//     //create hashed pass
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     });

//     const userDetails = {
//       name: user.username,
//       _id: user._id,
//     };

//     const secretKey = "SSC";
//     const payload = {
//       userDetails,
//     };
//     const jwtToken = await jwt.sign(payload, secretKey);

//     return res.json({ status: true, jwtToken, userDetails });
//   } catch (error) {
//     return res.json({ msg: "Server issue :(", status: false });
//   }
// };

// module.exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.json({ msg: "Email is not registered!", status: false });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Password :(", status: false });

//     const userDetails = {
//       username: user.username,
//       _id: user._id,
//     };

//     const secretKey = "SSC";
//     const payload = {
//       userDetails,
//     };
//     const jwtToken = await jwt.sign(payload, secretKey);

//     return res.json({ status: true, jwtToken, userDetails });
//   } catch (error) {
//     return res.json({ msg: "Server issue :(", status: false });
//   }
// };
