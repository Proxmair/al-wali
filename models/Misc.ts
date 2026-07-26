import mongoose from "mongoose";

const MiscSchema = new mongoose.Schema(
  {
    bannerText: {
      type: String,
      required: true,
      trim: true,
    },

    bannerDesktopImage: {
      type: String,
      required: true,
    },

    bannerMobileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Misc ||
  mongoose.model("Misc", MiscSchema);