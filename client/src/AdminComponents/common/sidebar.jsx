import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { IoLogOutOutline, IoHomeOutline, IoEyeOutline } from "react-icons/io5";
import { FaQuora, FaSearchLocation, FaTeamspeak } from "react-icons/fa";
import { GiRamProfile } from "react-icons/gi";
import { LuFilePen } from "react-icons/lu";
import { MdManageHistory } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";
import { TfiGallery } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { LiaAwardSolid } from "react-icons/lia";
import { GoGoal } from "react-icons/go";
import { SiWelcometothejungle } from "react-icons/si";
import { PiGitlabLogo } from "react-icons/pi";
import { BiError } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { SiReadthedocs } from "react-icons/si";

function AdminSidebar({ closeSidebar }) {
  const [openHome, setOpenHome] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleLinkClick = () => {
    closeSidebar();
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${
      isActive
        ? "bg-[#e6623918] text-[#e66239] "
        : "hover:bg-[#e6623918] hover:text-[#e66239]"
    }`;

  return (
    <div className="flex flex-col text-black text-sm">
      <h1 className="text-gray-500 font-medium">Main</h1>

      <nav className="space-y-2 mt-2">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          // onClick={handleLinkClick}
          className={linkClasses}
        >
          <IoHomeOutline className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        

        {/* add products */}
        <NavLink
          to="/admin/products"
          // onClick={handleLinkClick}
          className={linkClasses}
        >
          <IoMdAdd className="w-5 h-5" />
          <span>Add Products</span>
        </NavLink>

        {/* view Products */}

        <NavLink
          to="/admin/viewproducts"
          // onClick={handleLinkClick}
          className={linkClasses}
        >
          <IoEyeOutline className="w-5 h-5" />
          <span>View Products</span>
        </NavLink>

        {/* enquiry */}
        <NavLink
          to="/admin/enquiry"
          // onClick={handleLinkClick}
          className={linkClasses}
        >
          <FaSearchLocation className="w-5 h-5" />
          <span>Enquiry</span>
        </NavLink>

        {/* Home Dropdown */}
        {role === "superadmin" && (
          <>
            <div
              onClick={() => setOpenHome(!openHome)}
              className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#e6623918] hover:text-[#e66239] rounded"
            >
              <h2 className="font-semibold">Home</h2>
              {openHome ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {/* Dropdown Content */}
            {openHome && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {/* hero banner */}
                <NavLink to="/admin/herobanner" className={linkClasses}>
                  <LuFilePen className="w-5 h-5" />
                  <span>Hero banner</span>
                </NavLink>
                {/* about us */}
                <NavLink to="/admin/aboutus" className={linkClasses}>
                  <GoGoal className="w-5 h-5" />
                  <span>About Us</span>
                </NavLink>
                {/* welcome gym */}
                <NavLink to="/admin/welcome" className={linkClasses}>
                  <SiWelcometothejungle className="w-5 h-5" />
                  <span>Welcome</span>
                </NavLink>
                {/* Blog */}
                <NavLink to="/admin/blog" className={linkClasses}>
                  <PiGitlabLogo className="w-5 h-5" />
                  <span>Blog</span>
                </NavLink>

                {/* Pricing */}
                <NavLink to="/admin/prising" className={linkClasses}>
                  <MdManageHistory className="w-5 h-5" />
                  <span>Manage Pricing</span>
                </NavLink>

                {/* Testimonial */}
                <NavLink to="/admin/testimonial" className={linkClasses}>
                  <VscFeedback className="w-5 h-5" />
                  <span>Testimonial</span>
                </NavLink>

                {/* Service Plan */}
                <NavLink to="/admin/serviceplan" className={linkClasses}>
                  <GrServices className="w-5 h-5" />
                  <span>Service Plan</span>
                </NavLink>
              </div>
            )}
          </>
        )}

        {/* Pages Dropdown */}
        {role === "superadmin" && (
          <>
            <div
              onClick={() => setOpenPages(!openPages)}
              className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#e6623918] hover:text-[#e66239] rounded"
            >
              <h2 className="font-semibold">Pages</h2>
              {openPages ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {/* Dropdown Content */}
            {openPages && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {/* Awards */}
                <NavLink to="/admin/awards" className={linkClasses}>
                  <LiaAwardSolid className="w-5 h-5" />
                  <span>Awards</span>
                </NavLink>

                {/* Our Team */}
                <NavLink to="/admin/ourteam" className={linkClasses}>
                  <FaTeamspeak className="w-5 h-5" />
                  <span>Our Team</span>
                </NavLink>
                {/* faq */}
                <NavLink to="/admin/faq" className={linkClasses}>
                  <FaQuora className="w-5 h-5" />
                  <span>FAQ</span>
                </NavLink>

                {/* Gallery */}
                <NavLink to="/admin/gallery" className={linkClasses}>
                  <TfiGallery className="w-5 h-5" />
                  <span>Gallery</span>
                </NavLink>
              </div>
            )}
          </>
        )}
        

        {/* Account heading */}
        <p className="text-gray-500 text-sm font-medium mt-4">Account</p>

        <div className=" flex flex-col space-y-2 mt-2">
          {/* Profile */}
          <Link to="/admin/profile">
            <button className="cursor-pointer flex w-full items-center gap-3 px-4 rounded-lg transition hover:bg-[#e6623918] hover:text-[#e66239] text-left">
              <GiRamProfile className="w-5 h-5 " />
              <span className="py-2">Profile</span>
            </button>
          </Link>

          {/* Reports */}
          <Link to="/admin/reports">
            <button className="cursor-pointer flex w-full items-center gap-3 px-4 rounded-lg transition hover:bg-[#e6623918] hover:text-[#e66239] text-left">
              <TbReportSearch className="w-5 h-5 " />
              <span className="py-2">Reports</span>
            </button>
          </Link>

          {/* 404 Error */}
          <Link to="/admin/error">
            <button className="cursor-pointer flex w-full items-center gap-3 px-4 rounded-lg transition hover:bg-[#e6623918] hover:text-[#e66239] text-left">
              <BiError className="w-5 h-5 " />
              <span className="py-2">404 Error</span>
            </button>
          </Link>

          {/* docs */}
          {role === "superadmin" && (
            <Link to="/admin/docs">
              <button className="cursor-pointer flex w-full items-center gap-3 px-4 rounded-lg transition hover:bg-[#e6623918] hover:text-[#e66239] text-left">
                <SiReadthedocs className="w-5 h-5 " />
                <span className="py-2">Docs</span>
              </button>
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-3 px-4 rounded-lg transition hover:bg-[#e6623918] hover:text-[#e66239] text-left text-red-500"
          >
            <IoLogOutOutline className="w-5 h-5" />
            <span className="py-2">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminSidebar;
