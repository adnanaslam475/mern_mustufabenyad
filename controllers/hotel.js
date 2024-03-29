import Hotel from "../models/hotel";
import fs from "fs";


export const create = async (req, res) => {
  try {
    let fields = req.fields;
    let hotel = new Hotel({
      ...fields,
      images: req.fields.images.split(',')
    });
    hotel.postedBy = req.user._id;
    await hotel.save();
    res.json('saved sucessfully');
  } catch (err) {
    res.status(400).json({
      err: err.message
    });
  }
};

export const hotels = async (req, res) => {
  try {
    const { checkIn, checkOut, location, number_of_guests } = req.query;
    let regex = new RegExp(location, 'i');
    let regexIn = new RegExp(checkIn, 'i');
    let regexOut = new RegExp(checkOut, 'i');
    let regexNoOfGuests = new RegExp(number_of_guests, 'i');
    await Hotel.find({
      $and: [
        { 'location': regex },
        { 'checkIn': regexIn },
        { 'checkOut': regexOut },
        { 'number_of_guests': regexNoOfGuests },
      ]
    }).exec(function (err, hotel) {
      res.json(hotel == undefined ? [] : hotel);
    });


  } catch (error) {
    console.log('err38', error)
    throw new Error()
  }
};



export const sellerHotels = async (req, res) => {

  try {
    let all = await Hotel.find({ postedBy: req.user._id })
      .select("-image.data")
      .populate("postedBy", "_id name")
      .exec();
    // console.log('req.user.id', req.user._id)
    // console.log('allmyhotels--->', all);
    res.json(all);
  } catch (error) {
    // console.log('error57', error)
  }
};


export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(hotel);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    res.status(400).send("Hotel update failed. Try again.");
  }
};