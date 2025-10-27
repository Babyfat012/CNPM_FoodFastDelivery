import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel from '../models/UserModel';

describe('UserModel', () => {
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
        await UserModel.deleteMany({});
    });

    it('should create a user successfully', async () => {
        const userData = {
            password: 'password123',
            ownerName: 'John Doe',
            phone: '1234567890',
            email: 'john@example.com'
        };

        const user = await UserModel.create(userData);

        expect(user.password).toBe(userData.password);
        expect(user.ownerName).toBe(userData.ownerName);
        expect(user.phone).toBe(userData.phone);
        expect(user.email).toBe(userData.email);
    });

    it('should fail when required fields are missing', async () => {
        const userData = {
            ownerName: 'John Doe'
        };

        await expect(UserModel.create(userData)).rejects.toThrow();
    });

    it('should fail when email is duplicate', async () => {
        const userData = {
            password: 'password123',
            ownerName: 'John Doe',
            phone: '1234567890',
            email: 'john@example.com'
        };

        await UserModel.create(userData);

        const duplicateUser = {
            password: 'password456',
            ownerName: 'Jane Doe',
            phone: '0987654321',
            email: 'john@example.com'
        };

        await expect(UserModel.create(duplicateUser)).rejects.toThrow();
    });

    it('should fail when phone is duplicate', async () => {
        const userData = {
            password: 'password123',
            ownerName: 'John Doe',
            phone: '1234567890',
            email: 'john@example.com'
        };

        await UserModel.create(userData);

        const duplicateUser = {
            password: 'password456',
            ownerName: 'Jane Doe',
            phone: '1234567890',
            email: 'jane@example.com'
        };

        await expect(UserModel.create(duplicateUser)).rejects.toThrow();
    });
});
