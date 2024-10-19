const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Item = require('../models/itemModel');

module.exports = async () => {
  try {
    await Order.deleteMany({});

    // Fetch users by their names
    const userNames = ["Manager", "Client", "Delivery"];
    const users = await User.find({ name: { $in: userNames } });
    
    const itemNames = ["Coca Cola", "Burger", "Chips"]; 
    const items = await Item.find({ name: { $in: itemNames } });

    if (users.length !== userNames.length) {
      throw new Error("Some users were not found");
    }

    if (items.length !== itemNames.length) {
        throw new Error("Some items were not found");
    }

    const orders = [
      {
        user: users[0]._id,
        items: [
          {
            item: items[0]._id,
            quantity: 2,
            price: 10.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 40.0,
        status: 'Pending'
      },
      {
        user: users[1]._id,
        items: [
          {
            item: items[2]._id,
            quantity: 3,
            price: 15.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 45.0,
        status: 'Processing'
      },

      {
        user: users[2]._id,
        items: [
          {
            item: items[2]._id,
            quantity: 3,
            price: 15.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 45.0,
        status: 'Processing'
      },
      {
        user: users[1]._id,
        items: [
          {
            item: items[2]._id,
            quantity: 3,
            price: 15.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 45.0,
        status: 'Processing'
      },
      {
        user: users[0]._id,
        items: [
          {
            item: items[0]._id,
            quantity: 2,
            price: 10.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 40.0,
        status: 'Pending'
      },
      {
        user: users[0]._id,
        items: [
          {
            item: items[0]._id,
            quantity: 2,
            price: 10.0
          },
          {
            item: items[1]._id,
            quantity: 1,
            price: 20.0
          }
        ],
        totalPrice: 40.0,
        status: 'Pending'
      },

    ];

    await Order.insertMany(orders);
    console.log('Orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
};