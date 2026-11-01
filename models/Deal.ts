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

    isActive: {
      type: Boolean,
      required: true,
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

const Deal =
  mongoose.models.Deal || mongoose.model("Deal", DealSchema);

// During local development Mongoose reuses an already compiled model after
// hot reloads. Add the field to that cached schema as well.
if (!Deal.schema.path("isActive")) {
  Deal.schema.add({
    isActive: {
      type: Boolean,
      default: false,
    },
  });
}

export default Deal;
