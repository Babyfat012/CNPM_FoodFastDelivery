import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import ResRoutes from '../routes/ResRoutes.js';
import RestaurantModel from '../models/ResModel.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(ResRoutes);

describe('Restaurant Routes', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        process.env.KEY = 'test-secret-key';
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await RestaurantModel.deleteMany({});
    });

    describe('POST /res/register', () => {
        it('should register a new restaurant successfully', async () => {
            const restaurantData = {
                ownerName: 'John Doe',
                password: 'password123',
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh'
            };

            const response = await request(app)
                .post('/res/register')
                .send(restaurantData);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('User registered successfully');
        });

        it('should fail when restaurant already exists', async () => {
            const restaurantData = {
                ownerName: 'John Doe',
                password: 'password123',
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh'
            };

            await RestaurantModel.create({
                ...restaurantData,
                password: await bcrypt.hash(restaurantData.password, 10)
            });

            const response = await request(app)
                .post('/res/register')
                .send(restaurantData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /ResLogin', () => {
        it('should login successfully with correct credentials', async () => {
            const password = 'password123';
            const hashedPassword = await bcrypt.hash(password, 10);

            await RestaurantModel.create({
                ownerName: 'John Doe',
                password: hashedPassword,
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh'
            });

            const response = await request(app)
                .post('/ResLogin')
                .send({ email: 'test@example.com', password });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('Login successful');
            expect(response.headers['set-cookie']).toBeDefined();
        });

        it('should fail with incorrect password', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);

            await RestaurantModel.create({
                ownerName: 'John Doe',
                password: hashedPassword,
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh'
            });

            const response = await request(app)
                .post('/ResLogin')
                .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Password is incorrect');
        });

        it('should fail with unregistered email', async () => {
            const response = await request(app)
                .post('/ResLogin')
                .send({ email: 'notfound@example.com', password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User is not registered');
        });
    });

    describe('GET /logout', () => {
        it('should clear cookie and logout successfully', async () => {
            const response = await request(app).get('/logout');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
        });
    });

    describe('PATCH /updateStatus/:restaurantId', () => {
        it('should update restaurant status to closed', async () => {
            const restaurant = await RestaurantModel.create({
                ownerName: 'John Doe',
                password: await bcrypt.hash('password123', 10),
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh',
                isOpen: true
            });

            const token = jwt.sign({ id: restaurant._id }, process.env.KEY);

            const response = await request(app)
                .patch(`/updateStatus/${restaurant._id}`)
                .set('Cookie', [`token=${token}`])
                .send({ status: 'Closed' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Status updated successfully');

            const updatedRestaurant = await RestaurantModel.findById(restaurant._id);
            expect(updatedRestaurant.isOpen).toBe(false);
        });

        it('should update restaurant status to open', async () => {
            const restaurant = await RestaurantModel.create({
                ownerName: 'John Doe',
                password: await bcrypt.hash('password123', 10),
                restaurantName: 'Test Restaurant',
                phone: '1234567890',
                email: 'test@example.com',
                city: 'Ho Chi Minh',
                address: '123 Test St',
                countryName: 'Vietnam',
                stateName: 'Ho Chi Minh',
                isOpen: false
            });

            const token = jwt.sign({ id: restaurant._id }, process.env.KEY);

            const response = await request(app)
                .patch(`/updateStatus/${restaurant._id}`)
                .set('Cookie', [`token=${token}`])
                .send({ status: 'Open' });

            expect(response.status).toBe(200);

            const updatedRestaurant = await RestaurantModel.findById(restaurant._id);
            expect(updatedRestaurant.isOpen).toBe(true);
        });

        it('should fail when restaurant not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const token = jwt.sign({ id: fakeId }, process.env.KEY);

            const response = await request(app)
                .patch(`/updateStatus/${fakeId}`)
                .set('Cookie', [`token=${token}`])
                .send({ status: 'Open' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Restaurant not found');
        });
    });
});
