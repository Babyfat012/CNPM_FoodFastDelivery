// models/MenuModel.js
// models/MenuModel.js
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cuisineName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId,
  ref: 'User', required: true } // Link to the users model
});

const MenuItemModel = mongoose.model('MenuItem', MenuItemSchema);

export default MenuItemModel;
