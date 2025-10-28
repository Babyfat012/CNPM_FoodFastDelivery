import { jest } from '@jest/globals';

// --- prepare mocks (names start with "mock" so jest allows lazy access) ---
const mockCreateOrder = jest.fn();
const mockPaymentCreate = jest.fn();
const mockPaymentFind = jest.fn();

// mock ESM modules before importing the controller
jest.unstable_mockModule('razorpay', () => ({
  default: class {
    constructor() {
      this.orders = { create: mockCreateOrder };
    }
  },
}));

jest.unstable_mockModule('../models/PaymentModel.js', () => ({
  Payment: {
    create: mockPaymentCreate,
    find: mockPaymentFind,
  },
}));

// dynamic import of the ESM controller after mocks are registered
let checkout, verify, userOrder, allOrders;
beforeAll(async () => {
  const paymentModule = await import('../Controllers/payment.js');
  checkout = paymentModule.checkout;
  verify = paymentModule.verify;
  userOrder = paymentModule.userOrder;
  allOrders = paymentModule.allOrders;
});

// Helper res mock
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('payment controllers', () => {
  test('checkout: tạo order Razorpay và trả về thông tin', async () => {
    mockCreateOrder.mockResolvedValue({ id: 'order_123' });
    const req = {
      body: {
        products: [
          { price: 100, quantity: 2 },
          { price: 50, quantity: 1 },
        ],
        ownerId: 'u1',
        orderItems: [{ sku: 'A' }],
        useraddress: { city: 'HCM' },
      },
    };
    const res = mockRes();

    await checkout(req, res);

    expect(mockCreateOrder).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 250 * 100, currency: 'INR' })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: 'order_123',
        amount: 250,
        ownerId: 'u1',
        payStatus: 'created',
      })
    );
  });

  test('verify: lưu thanh toán vào DB và trả success', async () => {
    const req = {
      body: {
        orderId: 'order_123',
        ownerId: 'u1',
        paymentId: 'pay_999',
        signature: 'sig_xxx',
        amount: 250,
        orderItems: [{ sku: 'A' }],
        useraddress: { city: 'HCM' },
      },
    };
    const res = mockRes();
    mockPaymentCreate.mockResolvedValue({ _id: 'db_1' });

    await verify(req, res);

    expect(mockPaymentCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: 'order_123',
        payStatus: 'paid',
      })
    );
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  test('userOrder: trả danh sách đơn theo ownerId hiện tại', async () => {
    const sortMock = jest.fn().mockResolvedValue([{ _id: 'o1' }]);
    mockPaymentFind.mockReturnValue({ sort: sortMock });

    const req = { rootUser: { _id: 'u1' } };
    const res = mockRes();

    await userOrder(req, res);

    expect(mockPaymentFind).toHaveBeenCalledWith({ ownerId: 'u1' });
    expect(sortMock).toHaveBeenCalledWith({ orderDate: -1 });
    expect(res.json).toHaveBeenCalledWith([{ _id: 'o1' }]);
  });

  test('allOrders: trả toàn bộ đơn hàng, sort giảm dần', async () => {
    const sortMock = jest.fn().mockResolvedValue([{ _id: 'o2' }]);
    mockPaymentFind.mockReturnValue({ sort: sortMock });

    const req = {};
    const res = mockRes();
    await allOrders(req, res);

    expect(mockPaymentFind).toHaveBeenCalledWith();
    expect(sortMock).toHaveBeenCalledWith({ orderDate: -1 });
    expect(res.json).toHaveBeenCalledWith([{ _id: 'o2' }]);
  });
});