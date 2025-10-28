import { Payment } from "../models/PaymentModel.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: 'rzp_test_Jp05EcVr7cQRf3',
  key_secret: 'aXpDOvINq7xksY6otZQRvHX3',
}); 

// checkout
export const checkout = async (req, res) => {
  try {
    const { products , ownerId ,  orderItems , useraddress} = req.body;
    console.log(products);
  
    const amount = products.reduce((total, product) => total + product.price * product.quantity, 0) * 100; // in paise
     console.log(amount)
    var options = {
      amount: amount, // amount in the smallest currency unit
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount / 100, // in INR
      ownerId,
      orderItems,
      useraddress,
      payStatus: "created",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    ownerId,
    paymentId,
    signature,
    amount,
    orderItems,
    useraddress
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    ownerId,
    paymentId,
    signature,
    amount,
    orderItems,
    useraddress,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specific order
export const userOrder = async (req, res) => {
  try {
    let ownerId =  req.rootUser._id.toString(); // assuming req.userId is populated by authentication middleware
    console.log(ownerId);
    let orders = await Payment.find({ ownerId: ownerId }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//All orders
export const allOrders = async (req, res) => {
  try {
    let orders = await Payment.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};