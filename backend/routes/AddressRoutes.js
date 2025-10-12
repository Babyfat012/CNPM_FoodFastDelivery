import express from 'express';
import DeliveryAddressModel from '../models/DelAddressModel.js';
import { AuthenticateUser } from './UserRoutes.js';

const router = express.Router();

router.post('/deliveryaddress', AuthenticateUser ,async (req, res) => {
  const { address, country, state, city } = req.body;

  try {
    const userId = req.UserId; // Get the user's ID from the authenticated user

    const FullAddress = new DeliveryAddressModel({
      userId,
      address,
      country,
      state,
      city,
    });

    await FullAddress.save();

    res.status(200).json({message: "Address added",FullAddress, success:true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Route to get one of the deliveryaddress to edit it
router.get('/editaddress/:id',AuthenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const FullAddress = await DeliveryAddressModel.findById(id);
    res.status(200).json(FullAddress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});


//Route to get all user's address
router.get('/deliveryaddress/:userId', AuthenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const FullAddress = await DeliveryAddressModel.find({ userId });
    res.status(200).json(FullAddress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

//Route to update user's address
router.put('/deliveryaddress/:id', AuthenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const FullAddress = await DeliveryAddressModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(FullAddress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});


export default router;
