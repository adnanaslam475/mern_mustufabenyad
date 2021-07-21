import React from 'react';

import AlgoliaPlaces from "algolia-places-react";
import { DatePicker } from "antd";
import { Select } from "antd";
import moment from "moment";

const { Option } = Select;

const config = {
  appId: '08SSDUYVXB',
  apiKey: 'da119de21d0f54287575192fc8e4e70b',
  language: "en",
  countries: ["us"],
};

const HotelCreateForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  location,
  setLocation,
}) => {
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

        {/* <AlgoliaPlaces
          className="form-control m-2"
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "40px" }}
        /> */}

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
