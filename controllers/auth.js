import User from "../models/user";
import jwt from "jsonwebtoken";
import Amadeus from 'amadeus';

import unirest from "unirest";


function func() {
  var req = unirest("GET", "https://hotels4.p.rapidapi.com/locations/search");

  req.query({
    "query": "new york",
    "locale": "en_US"
  });
  req.headers({
    "x-rapidapi-key": "11a06c1236msh7e662a7bf36aba4p160c65jsn9fb959a8be8c",
    "x-rapidapi-host": "hotels4.p.rapidapi.com",
    "useQueryString": true
  });
  let response = null
  req.end(function (res) {
    // if (res.error) throw new Error(res.error);
    response = res.body
    console.log(res.body)
  })
  return response
}


// Mypasswordismypassword-1
var amadeus = new Amadeus({
  clientId: 'JIhL8PdQ6bSpy3WPcQ2PI7TOHdEZZsOA',
  clientSecret: 'ZXuMk0p4fQZiuaSt'
});

const amad = () => {

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2021-08-01',
    adults: '2'
  }).then(function (response) {
    console.log(response.data);
  }).catch(function (responseError) {
    console.log(responseError.code);
  });
}

export const register = async (req, res) => {
  try {
    const { email, } = req.body;
    let userExist = await User.findOne({ email })
    if (userExist) {
      console.log('if')
      return res.json({ ok: false, msg: 'email is already taken' });
    }
    else {
      console.log('else')
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({ ok: true, user, msg: 'user created sucessfully' });
    }
  } catch (err) {
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {

    // check if user with that email exist
    let user = await User.findOne({ email });
    if (!user) {
      var api = null
      amadeus.shopping.hotelOffer('123').get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2021-08-01',
        adults: '2'
      }).then(function (response) {
        
        api = response.data
        console.log('sucess',api);
      }).catch(function (responseError) {
        console.log('err87');
      });
      res.send({
        invalid: true,
        msg: "User with that email not found",
        hotelapi: api
      })
    } else {


      user.comparePassword(password, (err, match) => {
        if (!match || err) { return res.send({ invalid: true, msg: "Wrong password" }) };
        // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({
          invalid: false,
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      });
    }
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin failed");
  }
};