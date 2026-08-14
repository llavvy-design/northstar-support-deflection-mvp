require("dotenv").config();

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 5001;


// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Northstar API is running"
    });
});


// Order routes
app.use("/api/orders", orderRoutes);


// Start server
app.listen(PORT, () => {
    console.log(
        `Northstar API running on http://localhost:${PORT}`
    );
});