# Food Delivery Application

A full-stack food delivery application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- User Authentication (Customer, Restaurant, Delivery Partner)
- Restaurant Menu Management
- Real-time Order Tracking
- Cart Management
- Payment Integration
- Address Management
- Rating & Reviews System

## 🛠️ Tech Stack
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Stripe
- **Image Storage**: Cloudinary
- **Maps**: Google Maps API

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd fooddelivery-main
```

2. Create .env files:

For Backend (.env):
```bash
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/fooddelivery
KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPQUEST_API_KEY=your_mapquest_key
STRIPE_SECRET_KEY=your_stripe_key
```

For Frontend (src/.env):
```bash
VITE_API_URL=http://localhost:3000
```

3. Run with Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Running Locally (Development)

1. Install Backend Dependencies:
```bash
cd backend
npm install
npm start
```

2. Install Frontend Dependencies:
```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Documentation

Base URL: `http://localhost:3000/api`

### Available Routes:
- `/users` - User management
- `/restaurants` - Restaurant management
- `/orders` - Order management
- `/menu` - Menu management
- `/delivery` - Delivery partner management
- `/payment` - Payment processing

## 🔑 Environment Variables

### Backend Variables
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `KEY`: JWT secret key
- `CLOUDINARY_*`: Cloudinary credentials
- `MAPQUEST_API_KEY`: MapQuest API key
- `STRIPE_SECRET_KEY`: Stripe payment key

### Frontend Variables
- `VITE_API_URL`: Backend API URL

## 👥 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.


# Test 1