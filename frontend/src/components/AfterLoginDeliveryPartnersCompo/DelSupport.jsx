import React, { useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BackgroundImage from '../../assets/profile.jpg'; // Ensure the path is correct

const faqs = [
  {
    question: "What is the delivery process?",
    answer: "The delivery process includes the following steps: After you place an order, you choose a restaurant, and the request is sent to a delivery partner. The delivery partner receives the request and can either accept or decline it. Once accepted, the order appears in their 'Current Orders' section, where they can view the order ID and delivery address. The address can be manually copied, and the delivery partner can use the map in the 'Notification' section to search for the user's location and plan the route."
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, go to the login page, click on Forgot Password, and enter your registered email address. You will receive an email with a link to reset your password. Follow the instructions in the email to set a new password."
  },
  {
    question: "What should I do if my order is delayed?",
    answer: "If your order is delayed, please contact our support team for assistance."
  }
];

const DelSupport = () => {
  const [open, setOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleOpen = (answer) => {
    setSelectedAnswer(answer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer('');
  };

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full font-poppins h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow w-full max-w-xl p-8 border border-yellow-300 relative z-10">
        <CardContent className="text-center">
          <Typography variant="h4" className="text-yellow-500 font-bold mb-4">
            Support
          </Typography>

          <div className="text-left">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Contact Support
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Email Support: <strong>support@example.com</strong>
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Helpline: <strong>(123) 456-7890</strong>
            </Typography>
          </div>

          <div className="mt-4 text-left">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              FAQs
            </Typography>
            <ul className="list-disc list-inside text-gray-800">
              {faqs.map((faq, index) => (
                <li key={index} className="cursor-pointer" onClick={() => handleOpen(faq.answer)}>
                  {faq.question}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Answer</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedAnswer}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DelSupport;
