import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, hotelOwner } from "../middlewares";

// controllers
import { create, hotels, image, sellerHotels, remove, read, } from "../controllers/hotel";

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.post("/hotel/image/:hotelId", image);
router.post("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.post("/hotel/:hotelId", read);

// module.exports = router;
export default router;