import React, { useState, useEffect } from "react";
import { DatePicker,Input } from 'antd';
// import { allHotels } from '../actions/hotel';

// import { useSelector,  } from "react-redux";
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  // const state = useSelector((state) => ({ ...state }));
  const [input, setinput] = useState({
    latitude: '', longitude: "",
    city: '', checkIn: '', checkOut: '',
    guests: ''
  });
  const [city, setcity] = useState('')
  const [hotels, sethotels] = useState([])
  const [cityId, setcityId] = useState('')
  const [msg, setmsg] = useState('')



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setinput({
        ...input,
        latitude, longitude
      })
    })
  }, [])


  const handlechange = e => {
    setmsg('')
    setinput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (input.latitude) {
      axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${input.latitude},${input.longitude}&lang=en&lookFor=city&limit=1&token=957018d5a69e4436c45764bad40fd29c`).then(res => {
        setcity(res.data.results.locations[0].name)
        setcityId(res.data.results.locations[0].id)
      }).catch(err => {
        setmsg('cannot get locations , network error')
      })
    }
    
  }, [input.latitude])


  const submit = e => {
    e.preventDefault();
    axios.get(`https://engine.hotellook.com/api/v2/static/hotels.json?locationId=${cityId}&token=957018d5a69e4436c45764bad40fd29c`)
      .then(res => {
        sethotels(res.data.hotels)
      }).catch(err => {
        console.log(err)
      })

  }



  console.log('hotels', hotels)
  return (
    <div className="container-fluid h1 p-5 text-center">
      <h2>{city}</h2>
      <DatePicker
        placeholder="check in"
        className="form-control m-2"
        onChange={(date, dateString) => setinput({ ...input, checkIn: dateString })}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      /><DatePicker
        placeholder="check out "
        className="form-control m-2"
        onChange={(date, dateString) => setinput({ ...input, checkOut: dateString })}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <Input type='number' onChange={handlechange} required
        value={input.guests}
        placeholder='enter guest'
      />
      <button onClick={submit} className="btn btn-outline-primary m-2">Search</button>
      {hotels.map((v, i) => {
        return (<div key={i}>
          <img src={v.photos[0]?.url} style={{
            width: '200px',
            height: '200px'
          }} alt='i' />
          <p>Name : {v.name.en}</p>
          <p>check in : {v.checkIn||'not available'}</p>
          <p>check out : {v.checkOut||'not available'}</p>
        </div>)
      })}
    </div>
  );
};

export default Home;