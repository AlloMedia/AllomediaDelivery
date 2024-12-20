const Order = require("../../models/orderModel");
const Item = require("../../models/itemModel");
const User = require("../../models/userModel");
const Restaurant = require("../../models/restaurantModel");
const category = require("../../models/categoryModel");
const Cart = require("../../models/cartModel");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  try {
    const { items, deliveryPerson, address, userId } = req.body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message:
          "User not found. Please ensure you are properly authenticated.",
      });
    }

    // Validate delivery person if provided
    if (deliveryPerson) {
      const deliveryPersonExists = await User.findById(deliveryPerson);
      if (!deliveryPersonExists) {
        return res
          .status(404)
          .json({ message: "Specified delivery person not found" });
      }
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide at least one item in the order" });
    }

    // Validate address
    if (
      !address ||
      typeof address !== "string" ||
      address.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please provide a valid delivery address" });
    }

    let totalPrice = 0;
    const orderItems = [];
    const itemUpdates = [];

    // Process all items
    for (let itemObj of items) {
      const { itemId, quantity } = itemObj;

      // Validate item input
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res
          .status(400)
          .json({ message: `Invalid item ID format: ${itemId}` });
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for item ${itemId}. Must be a positive integer.`,
        });
      }

      // Fetch the item
      const item = await Item.findById(itemId);
      if (!item) {
        return res
          .status(404)
          .json({ message: `Item with ID ${itemId} does not exist.` });
      }

      if (item.stock < quantity) {
        return res.status(400).json({
          message: `Not enough stock for item ${item.name}. Available: ${item.stock}, Requested: ${quantity}.`,
        });
      }

      const priceForItem = item.price * quantity;
      orderItems.push({
        item: item._id,
        quantity: quantity,
        price: item.price,
        name: item.name,
      });

      itemUpdates.push({
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { stock: -quantity } },
        },
      });

      totalPrice += priceForItem;
    }

    // Bulk update all items
    await Item.bulkWrite(itemUpdates);

    // Create the order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice: totalPrice,
      deliveryPerson: deliveryPerson || null,
      notifiedDeliveryPeople: [],
      status: "Pending",
      address: address.trim(),
      createdAt: new Date(),
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order: {
        id: newOrder._id,
        totalPrice: newOrder.totalPrice,
        status: newOrder.status,
        items: newOrder.items,
        address: newOrder.address,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      message: "Internal server error while placing order",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID format",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.item",
        select: "name image price description",
        model: "Item",
      })
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        name: item.item.name,
        image: item.item.image,
        price: item.price,
        quantity: item.quantity,
        description: item.item.description,
      })),
      address: order.address,
      deliveryPerson: order.deliveryPerson,
    }));

    return res.status(200).json({
      message: "Orders retrieved successfully",
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      message: "Internal server error while fetching orders",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred",
    });
  }
};

const searchRestaurants = async (req, res) => {
  try {
    const { name, address } = req.query;

    if (!name && !address) {
      return res.status(400).json({
        message:
          "Veuillez fournir un nom ou une adresse de restaurant à rechercher.",
      });
    }

    const searchRestaurant = {};

    if (name) {
      searchRestaurant.name = { $regex: new RegExp(name, "i") };
    }

    if (address) {
      searchRestaurant.address = { $regex: new RegExp(address, "i") };
    }

    const restaurants = await Restaurant.find(searchRestaurant);

    if (restaurants.length === 0) {
      return res.status(404).json({
        message:
          "Aucun restaurant trouvé correspondant aux critères de recherche.",
      });
    }
    res
      .status(200)
      .json({ message: "Restaurants trouvés avec succès.", restaurants });
  } catch (error) {
    console.error("Erreur lors de la recherche des restaurants:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().limit(20).populate("category", "name");
    const itemsWithCategoryName = items.map((item) => ({
      ...item.toObject(),
      category: item.category.name,
    }));

    res.status(200).json(itemsWithCategoryName);
  } catch (error) {
    console.error("Error fetching all items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to add an item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const item = await Item.findById(productId);
    if (!item || item.status !== "available") {
      return res.status(404).json({ message: "Item not found or unavailable" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.item.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ item: productId, quantity: 1 });
    }
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.item"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart data" });
  }
};

module.exports = {
  searchRestaurants,
  getAllItems,
  createOrder,
  addItemToCart,
  getUserCart,
  getUserOrders,
};
