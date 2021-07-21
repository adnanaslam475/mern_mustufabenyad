import React, { useState } from "react";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel";
import HotelCreateForm from "../components/forms/HotelCreateForm";
import { useHistory } from "react-router-dom";
// import cities from './';

const NewHotel = () => {
  const history = useHistory()
  const url = "https://api.cloudinary.com/v1_1/mernapp/image/upload";
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
  const [imageUrl, setImageUrl] = useState('')
  const [location, setLocation] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, price, from, to, bed } = values;
    const image = imageUrl
    try {
      let hotelData = new FormData();
      hotelData.append("title", title);
      hotelData.append("content", content);
      hotelData.append("location", location);
      hotelData.append("price", price);
      imageUrl && hotelData.append("image", image);
      hotelData.append("from", from);
      hotelData.append("to", to);
      hotelData.append("bed", bed);
      createHotel(token.token, hotelData);
      history.push('/dashboard')
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setValues({ ...values, image: e.target.files[0] });
      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append("upload_preset", "olxApp")
      data.append("cloud_name", "mernapp")
      fetch(url, {
        method: "post",
        body: data
      }).then(res => res.json()).then(data => {
        setImageUrl(data.url)
      }).catch(err => {
        alert('network error, cannot upload image')
      })
    }
  }


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
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