const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Chains = require('./Chains');
const EditedStock = require('./EditedStock');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/ChainsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Added to parse JSON bodies
app.use(cors());

// API routes
app.listen(3000, () => console.log('Server is running on port 3000'));

// Get all chains
app.get('/Chains', async (req, res) => {
  const ans = await Chains.find();
  res.send(ans);
});
// Assuming you have a Mongoose model for EditedStocks
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
  const newStock = new EditedStock({
      id: req.body.id, // Make sure this matches the id of the chain being edited
      newStock: req.body.newStock, // This should be the amount subtracted
  });
  try {
      const savedStock = await newStock.save();
      res.status(201).json(savedStock);
  } catch (error) {
      res.status(400).json({ message: 'Error creating edited stock' });
  }
});

const handleDelete = (id) => {
  const apiUrl = `http://localhost:3000/EditedStocks/${id}`;
  fetch(apiUrl, {
    method: "DELETE",
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Continue with the state update or refetch here
  })
  .catch((error) => {
    console.error("Delete error:", error); // Log delete error details
    setError("Failed to delete stock.");
  });
};


// Get chain by ID
app.get('/Chains/:id', async (req, res) => {
  const ans = await Chains.findOne({ id: req.params.id });
  res.send(ans);
});

// Create a new chain
app.post('/Chains', async (req, res) => {
  const Chain = new Chains({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image  // This will store the image URL
  });
  const ans = await Chain.save();
  res.send(ans);
});



// Delete a chain
app.delete('/Chains/:id', async (req, res) => {
  const ans = await Chains.deleteOne({ id: req.params.id });
  res.send(ans);
});

// Update a chain
// Update a chain and log the edited stock
app.patch('/Chains/:id', async (req, res) => {
  try {
    const updatedChain = await Chains.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }  // Return the updated document
    );
    res.send(updatedChain);
  } catch (error) {
    res.status(500).send("Error updating the chain.");
  }
});


