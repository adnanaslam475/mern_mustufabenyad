import React, { useState, useEffect } from "react";
import { Button, DatePicker, Input } from 'antd';

import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import { useSelector, } from "react-redux";
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import moment from 'moment';
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
SwiperCore.use([Pagination, Navigation, Thumbs]);
const Home = () => {
  // const state = useSelector((state) => ({ ...state }));
  const [input, setinput] = useState({
    latitude: '', longitude: "",
    city: '', checkIn: '', checkOut: '',
    guests: '',
    children: '',
  });
  const [ThumbsSwiper, setThumbsSwiper] = useState(false)
  const [loading, setloading] = useState(false);
  const [city, setcity] = useState('')
  const [hotels, sethotels] = useState([])
  const [cityId, setcityId] = useState('')
  const [msg, setmsg] = useState('');

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
      axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${input.latitude},${input.longitude}&lang=en&lookFor=city&limit=1&token=957018d5a69e4436c45764bad40fd29c`)
        .then(res => {
          setcity(res.data.results.locations[0].name)
          setcityId(res.data.results.locations[0].id)
          setloading(true)
        }).catch(err => {
          setmsg('cannot get locations , network error')
        })
    }

  }, [input.latitude])


  useEffect(() => {
    if (cityId.trim().length) {
      axios.get(`https://engine.hotellook.com/api/v2/static/hotels.json?locationId=${cityId}&token=957018d5a69e4436c45764bad40fd29c`)
        .then(res => {
          sethotels(res.data.hotels);
          setloading(false)
        }).catch(err => {
          console.log(err);
          setmsg('network Error')
        })
    }
  }, [cityId])



  const send = e => {
    e.preventDefault();
    axios.get(`http://engine.hotellook.com/api/v2/search/start.json?iata=HKT&checkIn=${moment(input.checkIn).format('DD-MM-yyyy')}&checkOut=${moment(input.checkOut).format('DD-MM-yyyy')}&adultsCount=${input.guests}&customerIP=100.168.1.106&childrenCount=${input.children}&childAge1=8&lang=ru&currency=USD&waitForResult=0&marker=326030&signature=05cd11c5928cdc21581b38abf53c7783`)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
        setmsg('network Error')
      })
  }

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
      <button className="btn btn-outline-primary m-2">Search</button>
      <Grid container justify='space-between' >
        {loading ? <CircularProgress style={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent:'center',
          margin:'0 40% 0 40%'
        }} /> : hotels.map((v, i) => {
          return (<Grid item component={Paper} style={{
            padding: '2% 0 2% 0',
            marginBottom: '20px',
          }}
            md={4} xs={12} sm={6} xl={4} lg={4} key={i}>
            {v.photos === null ? < img src={'https://i.stack.imgur.com/y9DpT.jpg'}
              style={{
                minWidth: "95%",
                maxWidth: "95%",
                maxHeight: "70%",
                minHeight: "70%",
                marginBottom: '10px'
              }}
              alt='i' /> :
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                slideToClickedSlide
                style={{ margin: '5px' }}
                touchRatio={3}
                mousewheel
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                className="mySwiper"
                keyboard={true}
              >
                {v.photos.map((val, idx) => {
                  return (<SwiperSlide key={idx} style={{ maxHeight: '20vh' }}>
                    <img src={val.url} alt=""
                      style={{ maxHeight: '50vh' }} />
                  </SwiperSlide>)
                })}
              </Swiper>}
            <Typography>Name : {v.name.en}</Typography>
            <Typography>check in time : {v.checkIn || 'not available'}</Typography>
            <Typography>check out time : {v.checkOut || 'not available'}</Typography>
            <Button style={{
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: '5px',
              width: '50%'
            }} color='blue'
              onClick={() => ''} >Book</Button>
          </Grid>)
        })}</Grid>
    </div >
  );
};

export default Home;