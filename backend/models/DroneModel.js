// models/DroneModel.js
import mongoose from "mongoose";

const DroneSchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'IN_DELIVERY', 'MAINTENANCE', 'OFFLINE'],
    default: 'AVAILABLE'
  },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  maxPayload: {
    type: Number,
    required: true // in kilograms
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  assignedRestaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  maintenanceSchedule: {
    lastMaintenance: { type: Date },
    nextMaintenance: { type: Date }
  }
}, {
  timestamps: true
});

const DroneModel = mongoose.model('Drone', DroneSchema);

export default DroneModel;