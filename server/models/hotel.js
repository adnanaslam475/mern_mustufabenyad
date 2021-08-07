import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    number_of_guests: {
      type: String,
    },
    images: {
      type: Array,
    },
    checkIn: {
      type: String
    },
    checkOut: {
      type: String,
    },
    bed: {
      type: Number,
    },
  },
  { timestamps: true }
);
// hotelSchema.index({ '$**': 'text' });

export default mongoose.model("Hotel", hotelSchema);