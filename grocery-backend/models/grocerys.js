const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide value"],
    maxlength: [20, "title cannot be more than 20 characters"],
  },
});

module.exports = mongoose.model("Grocery", GrocerySchema);
