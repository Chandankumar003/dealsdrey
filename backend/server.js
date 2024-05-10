const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminSchema');
const cors = require("cors");
const express=require('express')
const cookieParser=require('cookie-parser')
const connectDB=require("./database")
const env = require("dotenv");
const bodyParser = require('body-parser');

const authRoutes=require("./routes/authRoute")
const employeeRoutes=require("./routes/emplyeeRoute")

const authenticate=require("./middlewares/authmiddleware")

const app=express();
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
env.config();

// Connect to MongoDB
connectDB();

const corsOptions = {
    origin: [process.env.FRONT_END_URL, process.env.ADMIN_URL],
    credentials: true 
  };
app.use(cors(corsOptions));



app.use('/admin', authRoutes);
app.use('/api', employeeRoutes);







// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });



// Sample admin data
// const adminData = {
//     username: 'chandu',
//     password: 'Chandu2001*',
//     email: 'Chandan03chandu@gmail.com'
//     // Add other fields as needed
// };

// // Hash the password before saving
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(adminData.password, salt, async (err, hash) => {
//         if (err) throw err;

//         adminData.password = hash;

//         try {
//             // Create admin

//             const admin = new Admin(adminData);
//             await admin.save();
//             console.log('Admin created successfully');
//             mongoose.connection.close();
//         } catch (err) {
//             console.error('Error creating admin:', err);
//             mongoose.connection.close();
//         }
//     });
// });
