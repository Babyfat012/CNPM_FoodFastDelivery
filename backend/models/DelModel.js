import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DeliverySchema = new Schema({
    password: { type: String, required: true },
    drivingLicenceNo: { type: String, required: true ,unique: true},
    ownerName: { type: String, required: true},
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    countryName: { type: String, required: true },
    stateName: { type: String, required: true }
});

const DeliveryModel = model("Delivery", DeliverySchema);

export default DeliveryModel;