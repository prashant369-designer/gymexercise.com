import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../CommonComponents/Navbar";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${base_url}/gallery/`);
        setGallery(res.data.data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
    <section className="min-h-screen bg-gray-100">
      <div className="bg-[#181818]">
        <Navbar />
      </div>
    <div className="px-6 py-10 max-w-7xl mx-auto ">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-1 bg-gray-400"></div>
        <h2 className="text-2xl font-semibold tracking-wide text-gray-800">
          GALLERY
        </h2>
      </div>

      {/* Grid */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
  {gallery.map((item, index) => (
    <div
      key={item.id}
      className="relative group overflow-hidden rounded-2xl break-inside-avoid"
    >
      {/* Image */}
      <img
        src={item.galleryimage}
        alt={item.gallerytitle}
        className={`w-full object-cover rounded-2xl transform group-hover:scale-110 transition duration-500 
        ${index % 3 === 0 ? "h-75" : index % 3 === 1 ? "h-100" : "h-62"}`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Text */}
      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-lg font-semibold">
          {item.gallerytitle}
        </h3>
        <p className="text-sm opacity-90 line-clamp-2">
          {item.gallerypara}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
    </section>
    </>
  );
}
