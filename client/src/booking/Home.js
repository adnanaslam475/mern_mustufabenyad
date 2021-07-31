import React, { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Input } from 'antd';
import Places from '../components/forms/Widget';
import algoliasearch from 'algoliasearch/lite';
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { InstantSearch } from 'react-instantsearch-dom';
import moment from 'moment';
// import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";
// import "swiper/swiper.min.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/thumbs/thumbs.min.css";
// SwiperCore.use([Pagination, Navigation, Thumbs]);



const Home = () => {
  const ref = useRef();
  const history = useHistory();
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );
  const token = localStorage.getItem('auth');
  const [input, setinput] = useState({
    checkIn: '', checkOut: '',
  });
  const [loading, setloading] = useState(false);
  const [hotels, sethotels] = useState([])
  const t = JSON.parse(token);
  const [msg, setmsg] = useState('');
  const [clear, setclear] = useState(false)
  const [err, setErr] = useState('')
  const [location, setLocation] = useState('')


  useEffect(() => {
    clear == false && axios.get(`/api/hotels`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${t.token}`
      }
    }).then(res => {
      sethotels(res.data);
      setloading(false)
    }).catch(err => {
      console.log('err19==>');
      setErr('network Error')
    })
  }, [clear])

  const clearAll = () => {
    setinput({ ...input, checkIn: '', checkOut: '' })
    setLocation('')
    setclear(false);
    setmsg('')
  }

  const gethotels = () => {
    if (location && input.checkIn && input.checkOut) {
      axios.get(`/api/hotels?location=${location}&checkIn=${moment(input.checkIn).format('DD-MM-yyyy')}&checkOut=${moment(input.checkOut).format('DD-MM-yyyy')}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        res.data.length == 0 && setmsg('no records found')
        sethotels(res.data)
        console.log('filtr-->', res.data)
      }).catch(err => {
        console.log('err19==>', err);
        setErr('network Error');
      })
      setclear(true)
    }
    else {
      setmsg('please enter all fields')
    }
  }

  // console.log(input.location)
  return (
    <div className="container-fluid h1 p-5 text-center">
      <InstantSearch indexName="city" ref={ref} onSearchStateChange={e => {
        setLocation(e.aroundLatLng);
      }} searchClient={searchClient}>
        <div className="search-panel">
          <div className="search-panel__results">
            <Places
              defaultRefinement={{
                lat: 37.7793,
                lng: -122.419,
              }}
            />
          </div>
        </div>
      </InstantSearch>
      <DatePicker
        placeholder="check in"
        className="form-control m-2"
        // value={input.checkIn}
        name='checkIn'
        onChange={(date, dateString) => { setinput({ ...input, checkIn: dateString }); setmsg('') }}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      /><DatePicker
        placeholder="check out "
        className="form-control m-2"
        // value={input?.checkOut}
        name='checkOut'
        onChange={(date, dateString) => setinput({ ...input, checkOut: dateString })}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <p style={{ color: 'red', fontSize: '1rem' }}>{msg}</p>
      <button onClick={gethotels}
        className="btn btn-outline-primary m-2">Search</button>
      {clear == true && <button onClick={clearAll}
        className="btn btn-outline-primary m-2">clear</button>}
      <Grid container justify='space-between' >
        {loading ? <CircularProgress style={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: '0 40% 0 40%'
        }} /> : hotels?.map((v, i) => {
          console.log(v)
          return (<Grid item component={Paper} style={{
            padding: '2% 0 2% 0',
            marginBottom: '20px',
          }}
            md={4} xs={12} sm={6} xl={4} lg={4} key={i}>
            <img src={v.image}
              className='hotel_img'
              alt='i' />
            <Typography>Name : {v.title}</Typography>
            <Typography>check in time : {v.checkIn}</Typography>
            <Typography>check out time : {v.checkOut}</Typography>
            <Button style={{
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: '5px',
              width: '50%',
              color: 'white'
            }}
              onClick={() => history.push('/payment',
              {data:v})} >Book</Button>
          </Grid>)
        })}</Grid>
    </div >
  );
}

export default Home;

{/* <Swiper
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
              </Swiper> */}