const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const Chains = require('./Chains');
const EditedStock = require('./EditedStock');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI; // MongoDB Atlas Connection String

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Default Route (Server Check)
app.get("/", (req, res) => {
    res.send("✅ Backend is running successfully!");
});

// Get all chains
app.get('/Chains', async (req, res) => {
    try {
        const chains = await Chains.find();
        res.json(chains);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chains", error });
    }
});

// Get a chain by ID
app.get('/Chains/:id', async (req, res) => {
    try {
        const chain = await Chains.findOne({ id: req.params.id });
        if (!chain) return res.status(404).json({ message: "Chain not found" });
        res.json(chain);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chain", error });
    }
});

// Create a new chain
app.post('/Chains', async (req, res) => {
    try {
        const chain = new Chains({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image // Assuming this stores the image URL
        });
        const savedChain = await chain.save();
        res.status(201).json(savedChain);
    } catch (error) {
        res.status(400).json({ message: "Error creating chain", error });
    }
});

// Delete a chain
app.delete('/Chains/:id', async (req, res) => {
    try {
        const result = await Chains.deleteOne({ id: req.params.id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error deleting chain", error });
    }
});

// Update a chain
app.patch('/Chains/:id', async (req, res) => {
    try {
        const updatedChain = await Chains.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedChain) return res.status(404).json({ message: "Chain not found" });
        res.json(updatedChain);
    } catch (error) {
        res.status(500).json({ message: "Error updating chain", error });
    }
});

// Get all edited stocks
app.get('/EditedStocks', async (req, res) => {
    try {
        const stocks = await EditedStock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching edited stocks', error });
    }
});

// Create a new edited stock
app.post('/EditedStocks', async (req, res) => {
    try {
        const newStock = new EditedStock({
            id: req.body.id,
            newStock: req.body.newStock
        });
        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: 'Error creating edited stock', error });
    }
});

// Delete an edited stock
app.delete('/EditedStocks/:id', async (req, res) => {
    try {
        const result = await EditedStock.deleteOne({ id: req.params.id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting edited stock', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
