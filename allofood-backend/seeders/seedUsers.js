const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

module.exports = async () => {
  try {
    await User.deleteMany({});

    // Fetch roles from the database to get their ObjectIds
    const superAdminRole = await Role.findOne({ name: "superAdmin" });
    const clientRole = await Role.findOne({ name: "client" });
    const deliveryRole = await Role.findOne({ name: "delivery" });
    const managerRole = await Role.findOne({ name: "manager" });

    const users = [
      {
        name: "Manager",
        email: "manager@gmail.com",
        phone: "0123456789",
        password: await bcrypt.hash("Manager-123456", 10),
        address: "123, Main Street, City",
        role: managerRole._id,
        isVerified: true,
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Client",
        email: "client@gmail.com",
        phone: "0123456789",
        password: await bcrypt.hash("User-123456", 10),
        address: "123, Main Street, City",
        role: clientRole._id,
        isVerified: true,
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Delivery",
        email: "delivery@gmail.com",
        phone: "0123456789",
        password: await bcrypt.hash("Delivery-123456", 10),
        address: "123, Main Street, City",
        role: deliveryRole._id,
        isVerified: true,
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        date: new Date(),
      },
      {
        name: "SuperAdmin",
        email: "superadmin@gmail.com",
        phone: "0123456789",
        password: await bcrypt.hash("SuperAdmin-123456", 10),
        address: "123, Main Street, City",
        role: superAdminRole._id,
        isVerified: true,
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
