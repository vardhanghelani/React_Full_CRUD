require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Chains = require('./Chains');
const EditedStock = require('./EditedStock');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Allow JSON data in requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Proper CORS setup to allow your frontend
app.use(cors({
    origin: "https://vardhanghelani.github.io", // GitHub Pages root domain
    methods: "GET, POST, PATCH, DELETE",
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes

// Get all chains
app.get('/Chains', async (req, res) => {
    try {
        const chains = await Chains.find();
        res.json(chains);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chains' });
    }
});

// Get a specific chain by ID
app.get('/Chains/:id', async (req, res) => {
    try {
        const chain = await Chains.findOne({ id: req.params.id });
        if (!chain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.json(chain);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chain' });
    }
});

// Create a new chain
app.post('/Chains', async (req, res) => {
    try {
        const newChain = new Chains({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        });

        const savedChain = await newChain.save();
        res.status(201).json(savedChain);
    } catch (error) {
        res.status(400).json({ message: 'Error creating chain' });
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

        if (!updatedChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }

        res.json(updatedChain);
    } catch (error) {
        res.status(500).json({ message: 'Error updating chain' });
    }
});

// Delete a chain
app.delete('/Chains/:id', async (req, res) => {
    try {
        const deletedChain = await Chains.deleteOne({ id: req.params.id });

        if (deletedChain.deletedCount === 0) {
            return res.status(404).json({ message: 'Chain not found' });
        }

        res.json({ message: 'Chain deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting chain' });
    }
});

// Get all edited stocks
app.get('/EditedStocks', async (req, res) => {
    try {
        const stocks = await EditedStock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching edited stocks' });
    }
});

// Create a new edited stock
app.post('/EditedStocks', async (req, res) => {
    try {
        const newStock = new EditedStock({
            id: req.body.id,
            newStock: req.body.newStock,
        });

        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: 'Error creating edited stock' });
    }
});

// Root route for checking server status
app.get('/', (req, res) => {
    res.send('🚀 Server is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
