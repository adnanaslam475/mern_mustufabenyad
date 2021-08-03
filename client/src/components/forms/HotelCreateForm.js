import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { DatePicker } from "antd";
import { Select } from "antd";
import moment from "moment";
import Places from '../forms/Widget';


const { Option } = Select;

const HotelCreateForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  setLocation,
  handleSubmit,
  images
}) => {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );
  const { title, content, price, number_of_guests } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          {images?.map((v, i) => <img style={{
            width: '50px',
            height: '50px',
            margin: '1rem',
          }} src={v} key={i} alt='v' />)}
        </div>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <InstantSearch indexName="airports"
          onSearchStateChange={e => {
            setLocation(e.aroundLatLng);
          }}
          searchClient={searchClient}>
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
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        <input
          type="number"
          name="number_of_guests"
          onChange={handleChange}
          placeholder="number of geusts"
          className="form-control m-2"
          value={number_of_guests}
        />
        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of rooms"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v, i) => <Option key={i}>{v}</Option>)}
        </Select>
      </div>
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, checkIn: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, checkOut: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelCreateForm;
{/* AIzaSyAMdJIc5N80bg6ErOOEvZoxvT0hFHXifpc */ }