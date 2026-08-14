const fs = require("fs/promises");
const path = require("path");


const findOrderById = async (orderId) => {

    // Locate orders.json
    const ordersFilePath = path.join(
        __dirname,
        "..",
        "..",
        "data",
        "orders.json"
    );

    // Read the file
    const fileContent = await fs.readFile(
        ordersFilePath,
        "utf-8"
    );

    // Convert JSON text into JavaScript data
    const orders = JSON.parse(fileContent);

    // Find the requested order
    const order = orders.find(
        (item) =>
            item.orderId.toLowerCase() ===
            orderId.trim().toLowerCase()
    );

    return order || null;
};


module.exports = {
    findOrderById
};