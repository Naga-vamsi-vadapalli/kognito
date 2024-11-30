require("dotenv").config(); 

const bcrypt = require("bcrypt");
const connectDB = require("./models/db"); 
const User = require("./models/User");
const Task = require("./models/Task");

const seedDatabase = async () => {
  await connectDB(); 

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword1 = await bcrypt.hash("user123", 10);
  const userPassword2 = await bcrypt.hash("user456", 10);

  const admin = await User.create({
    email: "admin@taskmanager1.com",
    password: adminPassword,
    role: "admin",
  });

  const user1 = await User.create({
    email: "user10@taskmanager.com",
    password: userPassword1,
    role: "user",
  });

  const user2 = await User.create({
    email: "user20@taskmanager.com",
    password: userPassword2,
    role: "user",
  });

  // Create some dummy tasks
  await Task.create({ description: "Complete documentation", assignedTo: user1._id });
  await Task.create({ description: "Review pull requests", assignedTo: user2._id });
  await Task.create({ description: "Prepare for meeting", assignedTo: user1._id });

  console.log("Database seeded successfully!");
  process.exit(0); // Exit the process
};

seedDatabase().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
