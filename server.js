require("dotenv").config();
const express = require("express");
const path = require("path");
const contactHandler = require("./api/contact");

const app = express();
app.use(express.json());

// Serve static files (like style.css, app.js)
app.use(express.static(__dirname));

// Serve index.html on root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Contact form handler
app.post("/api/contact", contactHandler);

// Start server
const PORT = 8000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
