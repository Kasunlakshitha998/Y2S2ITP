const router = require('express').Router();
const EmployeeModel = require('../../models/User/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
const nodemailer=require('nodemailer')
const cors = require('cors');
const express = require('express');
=======
const nodemailer = require('nodemailer');
>>>>>>> da275b8e824f956676db3e8d212d1007cbf46c56

const app = express();
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST","DELETE","PUT"],
  credentials:true

}));
app.use(cookieParser())




router.use(cookieParser());
router.route('/register').post((req, res) => {
    const { name, email, password, number } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        EmployeeModel.findOne({ email: email })
            .then((existingUser) => {
                if (existingUser) {
                    // Email already exists, return an error
                    res.status(400).json({ error: 'Email already registered' });
                } else {
                    // Email is unique, create a new user
                    EmployeeModel.create({ name, email, password: hash, number })
                        .then((newEmployee) => res.json(newEmployee))
                        .catch((err) => res.status(500).json({ error: err.message }));
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    });

    // Check if the email already exists
});

router.route('/login').post((req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ status: 'error', error: err.message });
          } else {
            if (result) {
              const token = jwt.sign({ email: user.email }, 'jwt-secret-key', {
                expiresIn: '1d',
              });
              res.cookie('token', token);
              res.json({ status: 'success', isAdmin: user.isAdmin });
            } else {
              res.status(401).json({ status: 'incorrect password' });
            }
          }
        });
      } else {
        res.status(404).json({ status: 'no record existed' });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', error: err.message });
    });
}); 

router.route('/userdetails').get((req, res) => {
  EmployeeModel.find({ isAdmin: false })
    .then((users) => {
      const userCount = users.length; // Get the count of regular users
      res.json({ users, userCount }); // Send both users and userCount in the response
    })
    .catch((err) => res.status(500).json(err));
});

router.route('/getUser/:id').get((req, res) => {
  const id = req.params.id;
  EmployeeModel.findById(id) // Using findById to directly search by _id
    .then((user) => {
      if (user) {
        res.json(user); // Send the user details in the response
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.route('/userupdate/:id').put(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        reenterpassword: req.body.reenterpassword,
        number: req.body.number,
      },
      { new: true }
    ); // Set { new: true } to return the updated document

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/deleteUser/:id').delete((req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.json(user); // Send the user details in the response
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
}) ;

// Function to generate a numeric OTP
function generateNumericOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

router.route('/forgot-password').post((req, res) => {
  const { email } = req.body;

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send({ status: 'User not existed' });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, 'jwt-secret-key', {
        expiresIn: '1d',
      });

      // Store token in cookie
      res.cookie('token', token);

      // Generate Numeric OTP
      const otp = generateNumericOTP(6);

      // Save the OTP in the database
      user.otp = otp;
      user.save();

      // Send OTP via Email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'navindadharmasiri@gmail.com',
          pass: 'xbdd pchv ufvh spcs',
        },
      });

      const mailOptions = {
        from: 'navindadharmasiri@gmail.com',
        to: email,
        subject: 'Reset Password OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send({ status: 'Error sending email' });
        } else {
          // Return the token and OTP in the response
          return res.send({ status: 'Success', token: token, otp: otp });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ status: 'Error processing request' });
    });
});

// Assuming this is your backend route for OTP verification
router.route('/verify-otp').post(async (req, res) => {
  const { otp } = req.body;

  try {
    // Retrieve token from cookie
    const token = req.cookies.token;

    // Decode token to get email
    try {
      const decodedToken = jwt.verify(token, 'jwt-secret-key');
      const email = decodedToken.email;
      // Rest of your code
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      return res
        .status(401)
        .send({ status: 'Error', message: 'Invalid or missing JWT token' });
    }


    // Find user by email
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.send({ status: 'Incorrect OTP' });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.send({ status: 'Incorrect OTP' });
    }

    // Clear the OTP from the database after successful verification
    user.otp = null;
    await user.save();

    return res.send({ status: 'Success' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).send({ status: 'Error processing request' });
  }
});

router.route('/reset-password').post(async (req, res) => {
  const { Password } = req.body;
  try {
    if (!Password) {
      return res.status(400).send({
        status: 'Error resetting password',
        message: 'Password field is required',
      });
    }

    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, 'jwt-secret-key');
    const email = decodedToken.email;

    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        status: 'Error resetting password',
        message: 'User not found',
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    user.password = hashedPassword;
    await user.save();

    return res.send({ status: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res
      .status(500)
      .send({ status: 'Error resetting password', message: error.message });
  }
 
  
});
//const PORT = process.env.PORT || 8181;




module.exports = router;