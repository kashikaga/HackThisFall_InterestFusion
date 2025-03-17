const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fusionUser = require("../models/fusionUser");
const fusionPost = require("../models/fusionPost");

// Register a new user
const fusionRegister = async (req, res) => {
    try {
        const { name, uname, password } = req.body;

        if (!name || !uname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await fusionUser.findOne({ uname });

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const newUser = new fusionUser({
            name,
            uname,
            password, // Storing password as plain text (not recommended in production)
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login User
const fusionSignup = async (req, res) => {
    try {
        const { uname, password } = req.body;

        if (!uname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await fusionUser.findOne({ uname });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Centralized Auth Controller
const fusionAuth = async (req, res) => {
    try {
        const { uname, password } = req.body;

        if (!uname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await fusionUser.findOne({ username:uname });

        if (!user) {
            // Register user if not found
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new fusionUser({ username:uname, password: hashedPassword });
            await user.save();
        } else {
            // Verify password for login
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, uname: user.uname }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Authentication successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Publish a new post
const fusionPublishpost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        if (!userId || !title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await fusionUser.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new fusionPost({
            userId,
            title,
            content,
            createdAt: new Date(),
        });

        await newPost.save();

        res.status(201).json({ message: "Post published successfully", post: newPost });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getFusionPost = async (req, res) => {
    try {
        console.log("Fetching Fusion posts...");
        
        // Check if the database connection is active
        if (!fusionPost) {
            return res.status(500).json({ message: "Database connection issue." });
        }

        // Fetch posts from the database, sorted by creation date
        const posts = await fusionPost.find().sort({ createdAt: -1 });
        
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found." });
        }

        console.log(`Successfully fetched ${posts.length} posts.`);
        res.status(200).json(posts);

    } catch (error) {
        console.error("Error fetching Fusion posts:", error);
        res.status(500).json({ 
            message: "Internal Server Error. Please try again later.", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};


module.exports = { fusionRegister, fusionSignup, fusionPublishpost, fusionAuth,getFusionPost };
