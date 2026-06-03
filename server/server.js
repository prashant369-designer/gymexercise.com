import dotenv from "dotenv";
dotenv.config();

// Express
import express from "express";
import cors from "cors";
const app = express();

// authentication router
import AuthRouter from "./routes/Auth.router.js";

// Common Routers
import BlogRouter from "./routes/blog.router.js";
import WelcomeGymRouter from "./routes/WelcomeGym.router.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import FaqRouter from "./routes/faq.router.js";
import TestimonialRouter from "./routes/testimonial.router.js";
import PrisingRouter from "./routes/pricing.router.js";
import ContactUs from "./routes/contactUs.router.js";
import ScrollerHeading from "./routes/ScrollerHeading.router.js";
import AwardsRouter from "./routes/Awards.router.js";
import MentorRouter from "./routes/Mentor.router.js";
import ProductRouter from "./routes/product.router.js";
import HeroBannerRouter from "./routes/HeroBanner.router.js";
import PatnerLogoRouter from "./routes/PatnerLogo.router.js";
import AboutUsRouter from "./routes/AboutUs.router.js";
import ProfileRouter from "./routes/Profile.router.js";
import wishlistRoutes from "./routes/Wishlist.router.js";
import cartRoutes from "./routes/cart.router.js";
import QuoteRouter from "./routes/Quotes.router.js";
import SuperDashRouter from "./routes/SuperDash.router.js";
import JoiningCrudRouter from "./routes/Joiningcrud.routes.js";
import GalleryRouter from "./routes/Gallery.router.js";


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth router
app.use("/api/auth", AuthRouter); 

// common routers
app.use("/api/blog", BlogRouter);
app.use("/api/welcomegym", WelcomeGymRouter);
app.use("/api/service", serviceRoutes);
app.use("/api/faq", FaqRouter);
app.use("/api/testimonial", TestimonialRouter);
app.use("/api/pricing", PrisingRouter);
app.use("/api/contactus", ContactUs);
app.use("/api/scroller", ScrollerHeading);
app.use("/api/awards", AwardsRouter);
app.use("/api/mentor", MentorRouter); 
app.use("/api/products", ProductRouter);
app.use("/api/heroBanner", HeroBannerRouter);
app.use("/api/patnerLogo", PatnerLogoRouter);
app.use("/api/aboutus", AboutUsRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quotes", QuoteRouter);
app.use("/api/superdash", SuperDashRouter);
app.use("/api/joiningcrud", JoiningCrudRouter);
app.use("/api/gallery", GalleryRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});