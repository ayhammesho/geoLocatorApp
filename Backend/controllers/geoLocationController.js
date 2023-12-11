const Geolocation = require("../models/GeoLocationModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var axios = require("axios");

// get all locations
const getLocations = async (req, res) => {
  const locations = await Geolocation.find({}).sort({ createdAt: -1 });

  res.status(200).json(locations);
};

const getLocationByAddress = async (req, res) => {
  const address = req.params.address;

  const dbLocation = await Geolocation.findOne({ query: { text: address } });
  console.log(dbLocation);
  if (!dbLocation) {
    const config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.GEOAPIFY_API_KEY}`,
      headers: {},
    };
    await axios(config)
      .then(function (response) {
        location = new Geolocation({
          query: { text: address },
          location: response.data.features[0].properties,
        });
        location.save();
        res.status(200).json(location);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    res.status(200).json(dbLocation);
  }
};
const sendEmailWithLocationDetials = async (req, res) => {
  const email = req.query.email;
  const id = req.query.id;

  const data = await Geolocation.find({ _id: id });

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_SMTP,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const location = data[0].location;
  const info = await transporter
    .sendMail({
      from: "hemo20010804@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Geolocation Mern App Location details", // Subject line
      text: "this are your location details that you requested", // plain text body
      html: `  <div id="location-details" className="">
            <ul className="flex flex-col gap-4">

                <li>
                  <h6 className="text-xl font-bold mb-1">
                    Name of the Location:
                  </h6>
                  <p>${location.name}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">House Number:</h6>
                  <p>${location.housenumber}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">Street:</h6>
                  <p>${location.street}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">The Suburb:</h6>
                  <p>${location.suburb}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">City:</h6>
                  <p>${location.city}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">State:</h6>
                  <p>${location.state}</p>
                </li>

                <li>
                  <h6 className="text-xl font-bold mb-1">Country:</h6>
                  <p>${location.country}</p>
                </li>

              <li>
                <h6 className="text-xl font-bold mb-1">Result Type:</h6>
                <p>${location.result_type}</p>
              </li>
            </ul>
               <img
              className="mt-6"
              width="600"
              height="400"
              src=https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${location.lon},${location.lat}&zoom=14&scaleFactor=2&apiKey=4f33a49dbd53477ebcf8c2e081e6bd86

            />
            </div>
           `, // html body
    })
    .catch(console.error);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
  res.status(200).json({ msg: "Email Send successfully" });
};

module.exports = {
  getLocations,
  getLocationByAddress,
  sendEmailWithLocationDetials,
};
