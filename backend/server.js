const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Service Provider Schema & Model
const providerSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  phone: String,
});

const Provider = mongoose.model("Provider", providerSchema);

// ✅ Add New Service Provider
app.post("/api/providers", async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json({ message: "Provider added successfully", provider });
  } catch (error) {
    res.status(500).json({ error: "Error adding provider" });
  }
});

// ✅ Get All Providers
app.get("/api/providers", async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching providers" });
  }
});

// ✅ Search Providers by Category & Location
app.get("/api/providers/search", async (req, res) => {
  try {
    const { category, location } = req.query;
    const query = {};
    if (category) query.category = category;
    if (location) query.location = location;
    const providers = await Provider.find(query);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: "Error searching providers" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
