const getOrder = async (req, res) => {

    try {

        const { orderId } = req.params;

        if (!orderId || orderId.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Order number is required"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Order ${orderId} received`
        });

    } catch (error) {

        console.error("Order controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


module.exports = {
    getOrder
};