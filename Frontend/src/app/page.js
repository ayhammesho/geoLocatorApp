"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Home() {
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const config = {
      method: "post",
      url: `https://geolocatorbackend.onrender.com/api/geolocator/location/${data.address}`,
      headers: {},
    };
    await axios(config)
      .then(function (response) {
        setLocation(response.data.location);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSendEmail = async (data) => {
    const config = {
      method: "post",
      url: `https://geolocatorbackend.onrender.com/api/geolocator/sendEmail`,
      params: {
        id: "65760172b0ac00237f82ba30",
        email: emailRef.current.value,
      },
      headers: {},
    };
    await axios(config)
      .then(function (response) {
        console.log("Email Sent Succfuly !");
        console.log(response);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-5">
        {" "}
        <h1 className="text-4xl text-center font-bold mb-3">GEOLOCATOR</h1>
        <h5 className="">
          A Simple Geolocation web app to get your location from your address
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 ">
          <h6 className="mb-2">Enter Your Address Here</h6>
          <Input
            {...register("address", { required: true })}
            type="text"
            variant="underlined"
            label="Address"
            // onChange={() => {}}
            placeholder="United Arab Eimarates"
          />
          {errors.address && <span>This field is required</span>}
          <Button className="mt-4 block" type="submit" color="primary">
            Submit
          </Button>
        </form>
        <div className="py-8 ">
          <h6 className="mb-2">Send Results to your Email</h6>
          <Input
            ref={emailRef}
            type="email"
            variant="underlined"
            label="Email"
            placeholder="foo@example.com"
          />
          {/* {errors.email && <span>This field is required</span>} */}
          <Button className="mt-4 block" onClick={onSendEmail} color="primary">
            Send
          </Button>
        </div>
        {location && (
          <div id="location-details" className="">
            <ul className="flex flex-col gap-4">
              {location?.name && (
                <li>
                  <h6 className="text-xl font-bold mb-1">
                    Name of the Location:
                  </h6>
                  <p>{location?.name}</p>
                </li>
              )}

              {location?.housenumber && (
                <li>
                  <h6 className="text-xl font-bold mb-1">House Number:</h6>
                  <p>{location?.housenumber}</p>
                </li>
              )}

              {location?.street && (
                <li>
                  <h6 className="text-xl font-bold mb-1">Street:</h6>
                  <p>{location?.street}</p>
                </li>
              )}
              {location?.suburb && (
                <li>
                  <h6 className="text-xl font-bold mb-1">The Suburb:</h6>
                  <p>{location?.suburb}</p>
                </li>
              )}
              {location?.city && (
                <li>
                  <h6 className="text-xl font-bold mb-1">City:</h6>
                  <p>{location?.city}</p>
                </li>
              )}
              {location?.state && (
                <li>
                  <h6 className="text-xl font-bold mb-1">State:</h6>
                  <p>{location?.state}</p>
                </li>
              )}
              {location?.country && (
                <li>
                  <h6 className="text-xl font-bold mb-1">Country:</h6>
                  <p>{location?.country}</p>
                </li>
              )}

              <li>
                <h6 className="text-xl font-bold mb-1">Result Type:</h6>
                <p>{location?.result_type}</p>
              </li>
            </ul>
            {/* <iframe
              width="1200"
              height="700"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              src={`https://maps.google.com/maps?q='+${location.lat}+','+${location.lon}+'&hl=es&z=14&amp;output=embed`}
            ></iframe> */}
            <img
              className="mt-6"
              width="600"
              height="400"
              src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${location?.lon},${location?.lat}&zoom=14&scaleFactor=2&apiKey=4f33a49dbd53477ebcf8c2e081e6bd86`}
              alt="8531 East Marginal Way South, Tukwila, WA 98108, United States of America"
            />
          </div>
        )}
      </div>
    </main>
  );
}

// name;
// housenumber;
// street;
// suburb;
// city;
// state;
// country;
// lon;
// lat: result_type;
