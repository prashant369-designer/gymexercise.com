import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Home main route
import Home from "../Pages/Home";

// login & signup
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignupPage";
import ForgetPassword from "../Pages/forgetpassword";

// private route
import PrivateRoute from "../CommonComponents/privateRoute";

// pages
import AboutUsPage from "../Pages/AboutUsPage";
import BlogPage from "../Pages/BlogPage";
import CartPage from "../Pages/CartPage";
import ContactUsPage from "../Pages/ContactUsPage";
import FaqPages from "../Pages/FaqPages";
import GetQuotePage from "../Pages/GetQuotePage";
import OurServicesPages from "../Pages/OurServicesPages";
import OurTeam from "../Pages/OurTeam";
import PricingPages from "../Pages/PricingPages";
import ShopPage from "../Pages/ShopPage";
import WishlistPage from "../Pages/WishlistPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import BlogDetails from "../Pages/BlogDetails";
import GalleryPage from "../Pages/GalleryPage";
// admin panel
import AdminPanel from "../Layout/AdminPageLayout";
// super admin panel
import SuperAdminPanel from "../Layout/SuperAdminPageLayout";

// Admin pages
import Dashboard from "../AdminComponents/components/MainDashboard";
import Blog from "../AdminComponents/components/Blog";
import Faq from "../AdminComponents/components/faq";
import Products from "../AdminComponents/components/AddProducts";
import ViewProducts from "../AdminComponents/components/ViewProducts";
import Enquiry from "../AdminComponents/components/Enquiry";
import Prising from "../AdminComponents/components/Prising";
import Testimonial from "../AdminComponents/components/Testimonial";
import ServicePlan from "../AdminComponents/components/ServicePlan";
import Awards from "../AdminComponents/components/Awards";
import OurTeamAdmin from "../AdminComponents/components/OurTeam";
import Gallery from "../AdminComponents/components/Gallery";
import Profile from "../AdminComponents/components/Profile";
import HeroBanner from "../AdminComponents/components/HeroBanner";
import AboutUs from "../AdminComponents/components/AboutUs";
import Welcome from "../AdminComponents/components/Welcome";
import Documentation from "../AdminComponents/components/Documentation";
import Error from "../AdminComponents/components/Error";
import Reports from "../AdminComponents/components/Reports";


// Super Admin pages
import SuperAdminDashboard from "../SuperAdminComponents/Dashboard";
import SuperAdminEnquiry from "../SuperAdminComponents/Enquiry";
import SuperAdminQuote from "../SuperAdminComponents/quote";
import SuperAdminMakeAdmin from "../SuperAdminComponents/MakeAdmin";
import SuperAdminViewProducts from "../SuperAdminComponents/ViewProducts";
import SuperAdminJoiningCrud from "../SuperAdminComponents/JoiningCrud";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* login & signup */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* pages */}
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/faq" element={<FaqPages />} />
        <Route path="/getquote" element={<GetQuotePage />} />
        <Route path="/ourservices" element={<OurServicesPages />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/pricing" element={<PricingPages />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/productdetails/:id" element={<ProductDetailsPage />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="viewproducts" element={<ViewProducts />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="profile" element={<Profile />} />
          <Route path="error" element={<Error />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Super Admin Routes */}
        <Route
          path="/superadmin"
          element={
            <PrivateRoute allowedRoles={["superadmin"]}>
              <SuperAdminPanel />
            </PrivateRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<Faq />} />
          <Route path="viewproducts" element={<SuperAdminViewProducts />} />
          <Route path="enquiry" element={<SuperAdminEnquiry />} />
          <Route path="quote" element={<SuperAdminQuote />} />
          <Route path="makeadmin" element={<SuperAdminMakeAdmin />} />
          <Route path="joiningcrud" element={<SuperAdminJoiningCrud />} />
          <Route path="prising" element={<Prising />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="serviceplan" element={<ServicePlan />} />
          <Route path="awards" element={<Awards />} />
          <Route path="ourteam" element={<OurTeamAdmin />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="profile" element={<Profile />} />
          <Route path="herobanner" element={<HeroBanner />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
