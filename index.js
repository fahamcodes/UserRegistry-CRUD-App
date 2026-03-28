// UserRegistry is a backend-focused web application developed using Node.js, Express.js, EJS, 
// and MongoDB. The project implements full CRUD functionality where users can be created, 
// viewed, updated, and deleted through a web interface. User data is stored in a MongoDB database 
// and dynamically rendered on the frontend using EJS templates. This project helps in understanding 
// how server-side rendering works, how form data is processed by backend routes, and how databases are 
// integrated into real-world web applications.

// 3️⃣ Technologies Used

// Backend
// Node.js
// Express.js

// MongoDB
// Mongoose

// Frontend
// EJS (Embedded JavaScript Templates)
// Tailwind CSS (via CDN)

// Tools
// VS Code
// MongoDB Compass
// Git & GitHub

// 🔹 Backend & Frontend Concepts Covered

// This project covers the following core backend and frontend concepts:

// Backend Concepts
// Express.js server setup
// Routing using GET and POST methods
// Dynamic routing using route parameters (:id)
// Middleware usage in Express
// Body parsing using express.json() and express.urlencoded()
// Server-side rendering using EJS (Embedded JavaScript Templates)
// MongoDB integration using Mongoos
// Schema and Model creation in MongoDB
// CRUD operations (Create, Read, Update, Delete)
// Asynchronous programming using async/await
// Basic MVC-style separation (Models, Views, Routes)

// Frontend Concepts
// HTML form handling
// Server-side rendered UI using EJS
// Dynamic data rendering using EJS templating syntax
// Conditional rendering (if-else) in EJS
// Looping through data using EJS (forEach)
// UI styling using Tailwind CSS (CDN based)
// Linking frontend actions (buttons/links) with backend routes

const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/indexmong');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Setting EJS as the view engine so we can render dynamic HTML pages
app.set("view engine", "ejs");

// Middleware to parse JSON data coming from requests
app.use(express.json());

// Middleware to read form data (POST requests)
// extended:true allows nested objects if needed in future
app.use(express.urlencoded({ extended: true }));

// Home route – shows the create user form
app.get('/', (req, res) => {
    res.render("index");
});

// Read route – fetches all users from database and displays them
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users });
});

// Create route – saves new user data to MongoDB
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;

    await userModel.create({
        name,
        email,
        image
    });

    // After creating user, redirecting to read page
    res.redirect('/read');
});

// Edit route – loads data of a specific user using dynamic ID
app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
});

// Update route – updates user data in database
app.post('/update/:userid', async (req, res) => {
    let { image, name, email } = req.body;

    await userModel.findOneAndUpdate(
        { _id: req.params.userid },
        { image, name, email },
        { returnDocument : 'after' }
    );

    res.redirect("/read");
});

// Delete route – removes a user using ID
app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

// Server listening on port 3000
app.listen(3000);
