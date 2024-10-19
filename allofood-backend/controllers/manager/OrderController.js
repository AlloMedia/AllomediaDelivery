const Order = require('../../models/orderModel');
// const User = require('../../models/userModel');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate({
        path: 'items.item',
        select: 'name price'
      })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

module.exports = {
  getAllOrders,
};