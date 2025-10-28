# Drone Routes Unit Tests

## Overview
Comprehensive unit tests for the Drone Routes API endpoints with 95.34% code coverage.

## Test File
`__tests__/Drone.route.test.js`

## Test Coverage
- **Statement Coverage**: 95.34%
- **Branch Coverage**: 100%
- **Function Coverage**: 100%
- **Line Coverage**: 94.87%

## Test Suites

### 1. POST /api/drones
Tests for creating new drones:
- ✅ Create a new drone successfully
- ✅ Fail when required fields are missing
- ✅ Fail when droneId already exists
- ✅ Fail with invalid status value

### 2. GET /api/drones
Tests for retrieving all drones:
- ✅ Get all drones
- ✅ Return empty array when no drones exist

### 3. GET /api/drones/:id
Tests for retrieving a single drone:
- ✅ Get a single drone by ID
- ✅ Return 404 when drone not found
- ✅ Return 500 with invalid ID format

### 4. PUT /api/drones/:id
Tests for updating a drone:
- ✅ Update a drone successfully
- ✅ Return 404 when updating non-existent drone
- ✅ Fail with invalid update data

### 5. DELETE /api/drones/:id
Tests for deleting a drone:
- ✅ Delete a drone successfully
- ✅ Return 404 when deleting non-existent drone

### 6. PATCH /api/drones/:id/status
Tests for updating drone status:
- ✅ Update drone status successfully
- ✅ Update status to MAINTENANCE
- ✅ Update status to OFFLINE
- ✅ Return 404 when updating status of non-existent drone
- ✅ Fail with invalid status value

### 7. Edge Cases
Tests for boundary conditions:
- ✅ Handle drone with all optional fields
- ✅ Handle battery level boundaries (0%)
- ✅ Reject battery level above 100
- ✅ Reject negative battery level

## Running the Tests

### Run all Drone tests
```bash
npm test -- Drone.route.test.js
```

### Run with coverage
```bash
npm test -- Drone.route.test.js --coverage
```

### Run in watch mode
```bash
npm run test:watch -- Drone.route.test.js
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

## Notes
- Tests use an in-memory MongoDB database for isolation
- All tests clean up after themselves (afterEach hook)
- Database connection is established before all tests and closed after all tests
- Tests validate both success and error scenarios
- Edge cases are thoroughly covered including boundary conditions

