require("dotenv").config();


const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5001;


// --------------------------------------------------
// HEALTH CHECK checks if the API is running and responding.
// --------------------------------------------------

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Northstar API is running"
    });
});


// --------------------------------------------------
// ORDER STATUS LOOKUP
// --------------------------------------------------

app.get("/api/orders/:orderId", async (req, res) => {

    try {

        // Get the order number from the URL
        const { orderId } = req.params;

        // Prevent empty/whitespace-only values
        if (!orderId || orderId.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Order number is required"
            });
        }

        // Locate the orders.json file
        const ordersFilePath = path.join(
            __dirname,
            "..",
            "data",
            "orders.json"
        );

        // Read the JSON file
        const fileContent = await fs.readFile(
            ordersFilePath,
            "utf-8"
        );

        // Convert JSON text into JavaScript data
        const orders = JSON.parse(fileContent);

        // Search for the requested order
        const order = orders.find(
            (item) =>
                item.orderId.toLowerCase() === orderId.trim().toLowerCase()
        );

        // Order does not exist
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Order exists
        return res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        console.error("Order lookup error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve order information"
        });
    }
});


// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
    console.log(
        `Northstar API running on http://localhost:${PORT}`
    );
});