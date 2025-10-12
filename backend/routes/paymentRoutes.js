import express from 'express'
import {
  checkout,
  verify,
  userOrder
} from "../Controllers/payment.js";
import {AuthenticateUser} from './UserRoutes.js'

const router = express.Router();

// checkout
router.post('/checkout',checkout);


router.post('/verify-payment', verify);

// user order
router.get("/UsersOrders",AuthenticateUser ,userOrder);

// All orders
//router.get("/UsersOrders",allOrders);
export default router;