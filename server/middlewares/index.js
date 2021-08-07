// import expressJwt from "express-jwt";
import Hotel from "../models/hotel";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    const user = await User.findOne({
      _id: decoded._id,
    })
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  }
  catch (e) {
    res.status(401).send({ msg: 'authorization required' })
  }
}
export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next()
};
