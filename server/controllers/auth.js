import User from "../models/user";
import jwt from "jsonwebtoken";
import Amadeus from 'amadeus';
// import md5 from 'md5';


// Mypasswordismypassword-1
var amadeus = new Amadeus({
  clientId: 'JIhL8PdQ6bSpy3WPcQ2PI7TOHdEZZsOA',
  clientSecret: 'ZXuMk0p4fQZiuaSt'
});


export const register = async (req, res) => {
  try {
    const { email } = req.body;
    let userExist = await User.findOne({ email })
    if (userExist) {
      return res.json({ ok: false, msg: 'email is already taken' });
    }
    const user = new User(req.body);
    await user.save();
    return res.json({ ok: true, user, msg: 'user created sucessfully' });
  }
  catch (err) {
    return res.status(400).send("Error. Try agains.")
  }
};

export const login = async (req, res) => {
  try {
    const { email,password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.send({
        invalid: true,
        msg: "User with that email not found",
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