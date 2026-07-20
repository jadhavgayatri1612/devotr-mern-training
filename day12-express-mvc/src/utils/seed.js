require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("Password123", 10);

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

    for (const userData of users) {
      const existingUser = await User.findOne({
        email: userData.email,
      });

      if (!existingUser) {
        await User.create(userData);
      }
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedUsers();
