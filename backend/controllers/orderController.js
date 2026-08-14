const {
    findOrderById
} = require("../services/orderService");


const getOrder = async (req, res) => {

    try {

        const { orderId } = req.params;

        // Validate the order ID
        if (!orderId || orderId.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Order number is required"
            });
        }

        // Ask the service to find the order
        const order = await findOrderById(orderId);

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

        console.error("Order controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve order information"
        });
    }
};


module.exports = {
    getOrder
};