import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import DeliveryModel from "../models/DelModel.js";

const router = express.Router();

// Register Route
router.post('/delivery/register', async (req, res) => {
  const { ownerName, password, drivingLicenceNo, phone, email,
     city, address, countryName, stateName } = req.body;

  try {
    let user = await DeliveryModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new DeliveryModel({
      ownerName,
      password: hashedPassword,
      drivingLicenceNo,
      phone,
      email,
      city,
      address,
      countryName,
      stateName
    });

    await user.save();
    return res.json({ status: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Login Route
router.post('/DelLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await DeliveryModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour in milliseconds

    return res.json({ status: true, message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Forgot Password Route
router.post('/DelForgotPasswordDialog', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await DeliveryModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vermabhoomi10248932@gmail.com',
        pass: 'fzzk drtd xspp zirk'
      }
    });

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" });

    const mailOptions = {
      from: 'vermabhoomi10248932@gmail.com',
      to: email,
      subject: 'Reset Your FoodieBuddy Password',
      text: `Hi,

We received a request to reset your FoodieBuddy password. If you made this request, please click the link below to set a new password.

If you didn't request a password reset, please ignore this email or let us know.

http://localhost:5173/DelResetPassword/${token}

Thank you for being a part of the FoodieBuddy community!

Best regards,
The FoodieBuddy Delivery Partners Team
`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({ status: "success", message: "Email sent" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// Reset Password Route
router.post('/DelResetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await DeliveryModel.findOneAndUpdate({ _id: id }, { password: hashedPassword });

    return res.json({ status: 'success', message: 'Password updated' });
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Invalid Token' });
  }
});

// Middleware to Verify User
export const AuthenticateDel = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    const verifyToken = jwt.verify(token, process.env.KEY);
    const rootDel = await DeliveryModel.findOne({ _id: verifyToken.id });
    
    if (!rootDel) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    
    req.token = token;
    req.rootDel = rootDel;
    req.DelId = rootDel._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

//Logout
router.get('/DelLogout',(req,res)=>{
  res.clearCookie('token')
  return res.json({status: true})
})

//Dashboard
router.get('/DelLayout/DelDashboard', AuthenticateDel, async (req, res) => {
  try {
    if (!req.rootDel) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(req.rootDel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});
//Details
router.get('/DelLayout/DelProfile', AuthenticateDel, async (req, res) => {
  try {
    if (!req.rootDel) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(req.rootDel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});
export default router