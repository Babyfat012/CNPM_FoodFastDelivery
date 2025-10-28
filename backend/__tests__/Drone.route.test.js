import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import DroneRoutes from '../routes/DroneRoutes.js';
import DroneModel from '../models/DroneModel.js';

const app = express();
app.use(express.json());
app.use('/api/drones', DroneRoutes);

describe('Drone Routes', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await DroneModel.deleteMany({});
    });

    describe('POST /api/drones', () => {
        it('should create a new drone successfully', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                currentLocation: {
                    latitude: 10.762622,
                    longitude: 106.660172
                },
                batteryLevel: 100,
                maxPayload: 5
            };

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(201);
            expect(response.body.droneId).toBe(droneData.droneId);
            expect(response.body.status).toBe(droneData.status);
            expect(response.body.batteryLevel).toBe(droneData.batteryLevel);
        });

        it('should fail when required fields are missing', async () => {
            const incompleteDroneData = {
                droneId: 'DRONE002',
                status: 'AVAILABLE'
                // Missing batteryLevel and maxPayload
            };

            const response = await request(app)
                .post('/api/drones')
                .send(incompleteDroneData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });

        it('should fail when droneId already exists', async () => {
            const droneData = {
                droneId: 'DRONE003',
                status: 'AVAILABLE',
                batteryLevel: 80,
                maxPayload: 5
            };

            await DroneModel.create(droneData);

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });

        it('should fail with invalid status value', async () => {
            const droneData = {
                droneId: 'DRONE004',
                status: 'INVALID_STATUS',
                batteryLevel: 90,
                maxPayload: 5
            };

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('GET /api/drones', () => {
        it('should get all drones', async () => {
            const drones = [
                {
                    droneId: 'DRONE001',
                    status: 'AVAILABLE',
                    batteryLevel: 100,
                    maxPayload: 5
                },
                {
                    droneId: 'DRONE002',
                    status: 'IN_DELIVERY',
                    batteryLevel: 75,
                    maxPayload: 5
                }
            ];

            await DroneModel.insertMany(drones);

            const response = await request(app).get('/api/drones');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].droneId).toBe(drones[0].droneId);
            expect(response.body[1].droneId).toBe(drones[1].droneId);
        });

        it('should return empty array when no drones exist', async () => {
            const response = await request(app).get('/api/drones');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });
    });

    describe('GET /api/drones/:id', () => {
        it('should get a single drone by ID', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const response = await request(app).get(`/api/drones/${drone._id}`);

            expect(response.status).toBe(200);
            expect(response.body.droneId).toBe(droneData.droneId);
            expect(response.body._id).toBe(drone._id.toString());
        });

        it('should return 404 when drone not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).get(`/api/drones/${fakeId}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Drone not found');
        });

        it('should return 500 with invalid ID format', async () => {
            const response = await request(app).get('/api/drones/invalid-id');

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('PUT /api/drones/:id', () => {
        it('should update a drone successfully', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const updateData = {
                status: 'MAINTENANCE',
                batteryLevel: 50
            };

            const response = await request(app)
                .put(`/api/drones/${drone._id}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(updateData.status);
            expect(response.body.batteryLevel).toBe(updateData.batteryLevel);
        });

        it('should return 404 when updating non-existent drone', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const updateData = {
                status: 'MAINTENANCE'
            };

            const response = await request(app)
                .put(`/api/drones/${fakeId}`)
                .send(updateData);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Drone not found');
        });

        it('should fail with invalid update data', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const invalidUpdate = {
                status: 'INVALID_STATUS'
            };

            const response = await request(app)
                .put(`/api/drones/${drone._id}`)
                .send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('DELETE /api/drones/:id', () => {
        it('should delete a drone successfully', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const response = await request(app).delete(`/api/drones/${drone._id}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Drone deleted');

            const deletedDrone = await DroneModel.findById(drone._id);
            expect(deletedDrone).toBeNull();
        });

        it('should return 404 when deleting non-existent drone', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).delete(`/api/drones/${fakeId}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Drone not found');
        });
    });

    describe('PATCH /api/drones/:id/status', () => {
        it('should update drone status successfully', async () => {
            const droneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const statusUpdate = {
                status: 'IN_DELIVERY'
            };

            const response = await request(app)
                .patch(`/api/drones/${drone._id}/status`)
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(statusUpdate.status);
        });

        it('should update status to MAINTENANCE', async () => {
            const droneData = {
                droneId: 'DRONE002',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const statusUpdate = {
                status: 'MAINTENANCE'
            };

            const response = await request(app)
                .patch(`/api/drones/${drone._id}/status`)
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('MAINTENANCE');
        });

        it('should update status to OFFLINE', async () => {
            const droneData = {
                droneId: 'DRONE003',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const statusUpdate = {
                status: 'OFFLINE'
            };

            const response = await request(app)
                .patch(`/api/drones/${drone._id}/status`)
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OFFLINE');
        });

        it('should return 404 when updating status of non-existent drone', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const statusUpdate = {
                status: 'MAINTENANCE'
            };

            const response = await request(app)
                .patch(`/api/drones/${fakeId}/status`)
                .send(statusUpdate);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Drone not found');
        });

        it('should fail with invalid status value', async () => {
            const droneData = {
                droneId: 'DRONE004',
                status: 'AVAILABLE',
                batteryLevel: 100,
                maxPayload: 5
            };

            const drone = await DroneModel.create(droneData);

            const invalidStatusUpdate = {
                status: 'INVALID_STATUS'
            };

            const response = await request(app)
                .patch(`/api/drones/${drone._id}/status`)
                .send(invalidStatusUpdate);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('Edge Cases', () => {
        it('should handle drone with all optional fields', async () => {
            const fullDroneData = {
                droneId: 'DRONE001',
                status: 'AVAILABLE',
                currentLocation: {
                    latitude: 10.762622,
                    longitude: 106.660172
                },
                batteryLevel: 100,
                maxPayload: 5,
                maintenanceSchedule: {
                    lastMaintenance: new Date('2025-10-01'),
                    nextMaintenance: new Date('2025-11-01')
                }
            };

            const response = await request(app)
                .post('/api/drones')
                .send(fullDroneData);

            expect(response.status).toBe(201);
            expect(response.body.droneId).toBe(fullDroneData.droneId);
            expect(response.body.currentLocation.latitude).toBe(fullDroneData.currentLocation.latitude);
            expect(response.body.currentLocation.longitude).toBe(fullDroneData.currentLocation.longitude);
        });

        it('should handle battery level boundaries', async () => {
            const droneData = {
                droneId: 'DRONE002',
                status: 'AVAILABLE',
                batteryLevel: 0,
                maxPayload: 5
            };

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(201);
            expect(response.body.batteryLevel).toBe(0);
        });

        it('should reject battery level above 100', async () => {
            const droneData = {
                droneId: 'DRONE003',
                status: 'AVAILABLE',
                batteryLevel: 101,
                maxPayload: 5
            };

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });

        it('should reject negative battery level', async () => {
            const droneData = {
                droneId: 'DRONE004',
                status: 'AVAILABLE',
                batteryLevel: -10,
                maxPayload: 5
            };

            const response = await request(app)
                .post('/api/drones')
                .send(droneData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });
});

