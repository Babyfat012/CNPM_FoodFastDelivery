// backend/test/payment.controller.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";

// --- MOCK Razorpay (class) ---
const createOrderMock = vi.fn();

class FakeRazorpay {
  constructor() {
    this.orders = {
      create: createOrderMock,
    };
  }
}

vi.mock("razorpay", () => ({
  default: FakeRazorpay,
}));

// --- MOCK Payment model ---
const paymentCreateMock = vi.fn();
const paymentFindMock = vi.fn();

vi.mock("../models/PaymentModel.js", () => ({
  Payment: {
    create: paymentCreateMock,
    find: paymentFindMock,
  },
}));

// Import controllers SAU khi mock
const { checkout, verify, userOrder, allOrders } = await import(
  "../Controllers/payment.js"
);

// Helper res mock
const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("payment controllers", () => {
  it("checkout: tạo order Razorpay và trả về thông tin", async () => {
    // Arrange
    createOrderMock.mockResolvedValue({ id: "order_123" });
    const req = {
      body: {
        products: [
          { price: 100, quantity: 2 }, // 200
          { price: 50, quantity: 1 },  // 50  -> tổng 250 INR
        ],
        ownerId: "u1",
        orderItems: [{ sku: "A" }],
        useraddress: { city: "HCM" },
      },
    };
    const res = mockRes();

    // Act
    await checkout(req, res);

    // Assert
    expect(createOrderMock).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 250 * 100, currency: "INR" })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: "order_123",
        amount: 250, // đổi lại từ paise -> INR
        ownerId: "u1",
        payStatus: "created",
      })
    );
  });

  it("verify: lưu thanh toán vào DB và trả success", async () => {
    // Arrange
    const req = {
      body: {
        orderId: "order_123",
        ownerId: "u1",
        paymentId: "pay_999",
        signature: "sig_xxx",
        amount: 250,
        orderItems: [{ sku: "A" }],
        useraddress: { city: "HCM" },
      },
    };
    const res = mockRes();
    paymentCreateMock.mockResolvedValue({ _id: "db_1" });

    // Act
    await verify(req, res);

    // Assert
    expect(paymentCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: "order_123",
        payStatus: "paid",
      })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  it("userOrder: trả danh sách đơn theo ownerId hiện tại", async () => {
    // Arrange: Payment.find().sort() phải chainable
    const sortMock = vi.fn().mockResolvedValue([{ _id: "o1" }]);
    paymentFindMock.mockReturnValue({ sort: sortMock });

    const req = { rootUser: { _id: "u1" } };
    const res = mockRes();

    // Act
    await userOrder(req, res);

    // Assert
    expect(paymentFindMock).toHaveBeenCalledWith({ ownerId: "u1" });
    expect(sortMock).toHaveBeenCalledWith({ orderDate: -1 });
    expect(res.json).toHaveBeenCalledWith([{ _id: "o1" }]);
  });

  it("allOrders: trả toàn bộ đơn hàng, sort giảm dần", async () => {
    const sortMock = vi.fn().mockResolvedValue([{ _id: "o2" }]);
    paymentFindMock.mockReturnValue({ sort: sortMock });

    const req = {};
    const res = mockRes();

    await allOrders(req, res);

    expect(paymentFindMock).toHaveBeenCalledWith();
    expect(sortMock).toHaveBeenCalledWith({ orderDate: -1 });
    expect(res.json).toHaveBeenCalledWith([{ _id: "o2" }]);
  });
});
