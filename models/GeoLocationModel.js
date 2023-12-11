const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const geolocationSchema = new Schema(
  {
    location: {
      name: {
        type: String,
        required: false,
      },
      housenumber: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
      suburb: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      result_type: {
        type: String,
        required: true,
      },
    },
    query: {
      text: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Geolocation", geolocationSchema);
