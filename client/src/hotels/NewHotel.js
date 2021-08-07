import React, { useState } from "react";
import { toast } from "react-toastify";
// import { createHotel } from "../actions/hotel";
import HotelCreateForm from "../components/forms/HotelCreateForm";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { set } from "mongoose";


const NewHotel = () => {
  const history = useHistory()
  const url = "https://api.cloudinary.com/v1_1/mernapp/image/upload";
  var token = JSON.parse(localStorage.getItem('auth'));
  const [values, setValues] = useState({
    title: "",
    content: "",
    // image: "",
    price: "",
    checkIn: "",
    checkOut: "",
    bed: "",
    number_of_guests: ''
  });
  const [imageUrl, setImageUrl] = useState('')
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([])
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );


  const handleSubmit = async e => {
    e.preventDefault();
    const { title, content, price, checkIn,
      checkOut, bed, number_of_guests } = values;
    try {
      let hotelData = new FormData();
      hotelData.append("title", title);
      hotelData.append("content", content);
      hotelData.append("location", location);
      hotelData.append("price", price);
      images && hotelData.append("images", images);
      hotelData.append("checkIn", moment(checkIn).format('DD-MM-yyyy'));
      hotelData.append("checkOut", moment(checkOut).format('DD-MM-yyyy'));
      hotelData.append("bed", bed);
      hotelData.append("number_of_guests", number_of_guests);
      const res = await axios.post(`/api/create-hotel`, hotelData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      })
      // history.push
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(function (part, index) {
        const data = new FormData()
        data.append('file', part)
        data.append("upload_preset", "olxApp")
        data.append("cloud_name", "mernapp")
        fetch(url, {
          method: "post",
          body: data
        }).then(res => res.json()).then(data => {
          setImages(p => [...p, data.url])

        }).catch(err => {
          alert('network error, cannot upload image')
        })
      })
    }
  }


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              images={images}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={imageUrl || preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;