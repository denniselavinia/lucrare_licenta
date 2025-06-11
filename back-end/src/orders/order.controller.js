const Order = require("./order.model");

const createAOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Eroare la crearea comenzii:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "Nu a fost găsită nicio comandă." });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Eroare la obținerea comenzilor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createAOrder,
    getOrderByEmail
}