require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const geoLocatorRoutes = require("./routes/geolocator");

const app = express();

const cors = require("cors");

app.use(cors()); // Use this after the variable declaration

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/geolocator", geoLocatorRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the app" });
//   try {
//     fetch(
//       "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&"
//     ).then((res) => console.log(res.data));
//   } catch (err) {
//     console.log(err);
//   }
// });

// var config = {
//   method: "get",
//   url: `https://api.geoapify.com/v1/geocode/search?text=aleppo&apiKey=${process.env.GEOAPIFY_API_KEY}`,
//   headers: {},
// };

// axios(config)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
