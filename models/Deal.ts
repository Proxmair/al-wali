import mongoose from "mongoose";

const DealSchema = new mongoose.Schema(
  {
    // Product fields
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    images: {
      type: [String],
      default: [],
    },

    // Deal-specific fields
    dealHeading: {
      type: String,
      required: true,
      trim: true,
    },

    dealDescription: {
      type: String,
      required: true,
      trim: true,
    },

    dealDiscountPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Deal ||
  mongoose.model("Deal", DealSchema);