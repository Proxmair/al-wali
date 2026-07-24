import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    lineTotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: false,
        trim: true,
      },
    },
    shippingAddress: {
      country: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      apartmentNo: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      area: {
        type: String,
        default: "",
        trim: true,
      },
      postalCode: {
        type: String,
        default: "",
        trim: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash on Delivery",
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items: unknown[]) => Array.isArray(items) && items.length > 0,
        message: "Order must contain at least one item.",
      },
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
