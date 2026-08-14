require("dotenv").config();

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 5001;


// ================================
// MIDDLEWARE
// ================================

// Allow Express to read JSON request bodies
app.use(express.json());


// Basic request logger
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
    );

    next();
});


// ================================
// ROUTES
// ================================

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Northstar API is running"
    });
});


// Order routes
app.use("/api/orders", orderRoutes);


// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
    console.log(
        `Northstar API running on http://localhost:${PORT}`
    );
});