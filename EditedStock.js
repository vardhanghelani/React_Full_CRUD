const mongoose = require('mongoose');

const EditedStockSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // This is the id of the stock being edited
    newStock: { type: Number, required: true }, // The amount subtracted from stock
});

module.exports = mongoose.model('EditedStock', EditedStockSchema);
