const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('your-mongodb-url');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image:String,
    courseId:String

});

const transactionSchema = new mongoose.Schema({
    username:String,
    course:String
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = {
    Admin,
    User,
    Course
}