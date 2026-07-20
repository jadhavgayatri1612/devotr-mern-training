require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const seedUsers = async () => {
  try {
    // MongoDB se connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    // Passwords ko hash karna
    const hashedPassword = await bcrypt.hash("Password123", 10);

    // 1 Admin + 3 Regular Users
    const users = [
      {
        name: "Seed Admin",
        email: "seedadmin@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Seed User 1",
        email: "seeduser1@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Seed User 2",
        email: "seeduser2@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Seed User 3",
        email: "seeduser3@example.com",
        password: hashedPassword,
        role: "user",
      },
    ];

    // Existing users ko duplicate hone se bachana
    for (const userData of users) {
      const existingUser = await User.findOne({
        email: userData.email,
      });

      if (existingUser) {
        console.log(`${userData.email} already exists`);
      } else {
        await User.create(userData);
        console.log(`${userData.email} created successfully`);
      }
    }

    console.log("Seed completed successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedUsers();