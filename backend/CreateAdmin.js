const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminSchema');

async function createAdmin(adminData) {
    try {
        await mongoose.connect('mongodb://localhost:27017/your-database-name', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username: adminData.username }, { email: adminData.email }] });
        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        // Hash the password before saving
        const hash = await bcrypt.hash(adminData.password, 10);
        adminData.password = hash;

        // Create admin
        const admin = new Admin(adminData);
        await admin.save();
        console.log('Admin created successfully');
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        // Close MongoDB connection
        mongoose.disconnect();
    }
}
const adminData = {
    username: 'chandu',
    password: 'Chandu2001*',
    email: 'Chandan03chandu@gmail.com'
    // Add other fields as needed
};

createAdmin(adminData);
