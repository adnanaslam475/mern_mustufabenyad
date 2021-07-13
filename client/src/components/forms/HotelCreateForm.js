import React from 'react';
import algoliasearch from 'algoliasearch/lite';

// import AlgoliaPlaces from "algolia-places-react";
import { DatePicker } from "antd";
import { Select } from "antd";
import { InstantSearch, ClearRefinements } from 'react-instantsearch-dom';
import Places from './Widget';
import moment from "moment";

const { Option } = Select;

// const config = {
//   appId: '08SSDUYVXB',
//   apiKey: '4fedad0a5f82e46df7ae3fa3ae426a32',
//   language: "en",
//   countries: ["us"],
// };

const HotelCreateForm = ({
  values, imageUrl,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  location,
  setLocation,
}) => {

  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );
  const { title, content, price, image, bed, from, to } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">

        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

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

        

        <div className="ais-InstantSearch">
          <InstantSearch indexName="airports" searchClient={searchClient}>
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
        </div>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of rooms"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
          <Option key={5}>{5}</Option>
          <Option key={6}>{6}</Option>            <Option key={7}>{7}</Option>
          <Option key={8}>{8}</Option>
          <Option key={9}>{9}</Option>
          <Option key={10}>{10}</Option>
          <Option key={11}>{11}</Option>
          <Option key={12}>{12}</Option>
        </Select>


      </div>
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
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
