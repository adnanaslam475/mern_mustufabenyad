import React, { useState } from "react";
import { toast } from "react-toastify";
// import { DatePicker, Select } from "antd";
// import { useSelector } from "react-redux";
import { createHotel } from "../actions/hotel";
import HotelCreateForm from "../components/forms/HotelCreateForm";


const NewHotel = () => {
  var token = JSON.parse(localStorage.getItem('auth'));
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [location, setLocation] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image, price, from, to, bed } = values;
    try {
      let hotelData = new FormData();
      hotelData.append("title", title);
      hotelData.append("content", content);
      hotelData.append("location", location);
      hotelData.append("price", price);
      image && hotelData.append("image", image);
      hotelData.append("from", from);
      hotelData.append("to", to);
      hotelData.append("bed", bed);


      createHotel(token.token, hotelData);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
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