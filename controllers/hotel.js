import Hotel from "../models/hotel";
import fs from "fs";


export const create = async (req, res) => {
  try {
    let fields = req.fields;
    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    await hotel.save();
    res.json('saved sucessully');
    console.log('createhotel-->', hotel)
  } catch (err) {
    console.log('err20', err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const hotels = async (req, res) => {
  try {
    const { checkIn, checkOut, location } = req.query;

    let regex = new RegExp(location, 'i');
    const ress =await Hotel.find({
      $or: [
        { 'location': regex },
        { 'from': regex },
        { 'to': regex }
      ]
    }).exec(function (err, persons) {
      // console.log('whitregexz', persons);
      res.json(persons);

    });

    // await Hotel.find({ $text: { $search: location } })
    //   .select('-postedBy')
    //   .exec(function (err, docs) {
    //     console.log(err, '=====>', docs)
    //   });
    // let all = await Hotel.find({})
    //   .limit(24).select('-postedBy')
    //   .populate("postedBy", "_id name")
    //   .exec();


    console.log(ress)
    
  } catch (error) {
    console.log('err38', error)
  }
};



export const sellerHotels = async (req, res) => {

  try {
    console.log('req.user-->', req.user._id)
    let all = await Hotel.find({ postedBy: req.user._id })
      .select("-image.data")
      .populate("postedBy", "_id name")
      .exec();
    console.log('req.user.id', req.user._id)
    console.log('allmyhotels--->', all);
    res.json(all);
  } catch (error) {
    console.log('error57', error)
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
  console.log("SINGLE HOTEL", hotel);
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
    console.log(err);
    res.status(400).send("Hotel update failed. Try again.");
  }
};