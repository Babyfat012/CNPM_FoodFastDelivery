//Restaurant Schema
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RestaurantSchema = new Schema({
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    countryName: { type: String, required: true },
    stateName: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem"
        }],
    user:[{
        type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
    ] 
});

const RestaurantModel = model("Restaurant", RestaurantSchema);

export default RestaurantModel;

