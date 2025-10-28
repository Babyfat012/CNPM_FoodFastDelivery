# Order Routes Unit Tests

## Overview
Comprehensive unit tests for the Order Routes API endpoints with 71.3% route coverage.

## Test File
`__tests__/Order.route.test.js`

## Test Coverage
- **Statement Coverage**: 71.3% (OrderRoutes.js)
- **Branch Coverage**: 59.37%
- **Function Coverage**: 83.33%
- **Line Coverage**: 71.3%

## Test Suites

### 1. POST /api/orders/newOrder
Tests for creating new orders:
- ✅ Create a new order successfully with all required fields
- ✅ Fail when authentication is not provided
- ✅ Fail when missing required fields (paymentId, deliveryAddress, totalAmount)

**Authentication Required**: User Token (AuthenticateUser middleware)

### 2. PUT /api/orders/updateOrder/:id
Tests for updating order status by restaurant:
- ✅ Update order status successfully by restaurant
- ✅ Return 404 when order doesn't exist
- ✅ Fail without proper authentication

**Authentication Required**: Restaurant Token (Authenticate middleware)

### 3. PUT /api/orders/updateOrderStatus/:id
Tests for updating order status by delivery person:
- ✅ Update order status successfully by delivery person
- ✅ Set drone status to AVAILABLE when order is marked as Delivered
- ✅ Return 404 for non-existent order

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

**Key Feature Tested**: 
- When an order status is updated to 'Delivered', the assigned drone's status is automatically changed to 'AVAILABLE'

### 4. PUT /api/orders/assignDrone/:id
Tests for assigning drones to orders:
- ✅ Assign drone to order successfully
- ✅ Update drone status to IN_DELIVERY upon assignment
- ✅ Return 404 for non-existent order
- ✅ Fail without authentication

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

**Key Feature Tested**:
- When a drone is assigned to an order, the drone's status is automatically updated to 'IN_DELIVERY'

### 5. GET /api/orders/getOrdersByResId/:id
Tests for retrieving orders by restaurant ID:
- ✅ Get all orders for a specific restaurant
- ✅ Fail without authentication

**Authentication Required**: Restaurant Token (Authenticate middleware)

### 6. GET /api/orders/getAllDeliveredOrders
Tests for retrieving delivered orders:
- ✅ Get all orders with status 'Delivered'
- ✅ Filter out non-delivered orders

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

### 7. GET /api/orders/getAllOrders
Tests for retrieving unassigned orders:
- ✅ Get all orders where drone is null (unassigned orders)
- ✅ Exclude orders that already have a drone assigned

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

### 8. GET /api/orders/getAllAcceptedOrders
Tests for retrieving orders assigned to drones:
- ✅ Get all orders that have a drone assigned
- ✅ Exclude orders without drone assignment

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

### 9. GET /api/orders/getOrdersByDroneId/:id
Tests for retrieving orders by drone ID:
- ✅ Get all orders assigned to a specific drone
- ✅ Return empty array when drone has no orders

**Authentication Required**: Delivery Token (AuthenticateDel middleware)

### 10. GET /api/orders/getOrdersByUserId
Tests for retrieving orders by user ID:
- ✅ Get all orders placed by the authenticated user
- ✅ Fail without authentication

**Authentication Required**: User Token (AuthenticateUser middleware)

### 11. Edge Cases
Tests for complex scenarios:
- ✅ Handle multiple order items correctly (multiple dishes in one order)
- ✅ Handle order status transitions correctly (Preparing → Ready → Out for delivery → Delivered)

## Test Data Setup

Each test uses the following test data:
- **Test User**: Regular user account for placing orders
- **Test Restaurant**: Restaurant account for managing orders
- **Test Delivery**: Delivery person account for handling deliveries
- **Test Drone**: Drone for delivery assignments
- **Test Payment**: Payment record linked to orders
- **Test Address**: Delivery address for orders

All test data is created in `beforeEach` and cleaned up in `afterEach` to ensure test isolation.

## Running the Tests

### Run all Order tests
```bash
npm test -- Order.route.test.js
```

### Run with coverage
```bash
npm test -- Order.route.test.js --coverage
```

### Run in watch mode
```bash
npm run test:watch -- Order.route.test.js
```

## Test Results
**Total Tests**: 23
**Passed**: 23 ✅
**Failed**: 0

## Dependencies
- `jest`: Testing framework
- `supertest`: HTTP assertions
- `mongodb-memory-server`: In-memory MongoDB for testing
- `mongoose`: ODM for MongoDB
- `jsonwebtoken`: For creating authentication tokens

## Key Features Tested

### 1. Order Lifecycle
Tests cover the complete order lifecycle:
1. Order creation by user
2. Order status update by restaurant (Preparing → Ready)
3. Drone assignment by delivery person
4. Order status update by delivery person (Ready → Out for delivery → Delivered)
5. Automatic drone status management

### 2. Drone-Order Integration
- Assigning drone to order sets drone status to 'IN_DELIVERY'
- Marking order as delivered sets drone status back to 'AVAILABLE'
- Orders can be filtered by drone assignment status

### 3. Authentication & Authorization
Tests verify that:
- Each endpoint requires appropriate authentication
- User tokens only work with user-specific endpoints
- Restaurant tokens only work with restaurant-specific endpoints
- Delivery tokens only work with delivery-specific endpoints

### 4. Data Relationships
Tests validate proper population of related data:
- User information in orders
- Restaurant details in orders
- Payment information linkage
- Delivery address association
- Drone assignment tracking

## Notes
- Tests use in-memory MongoDB database for complete isolation
- All tests clean up after themselves
- JWT tokens are generated for authentication testing
- Tests verify both success and failure scenarios
- Drone status is automatically managed based on order status changes
- The system replaced deliveryman with drone for automated delivery

