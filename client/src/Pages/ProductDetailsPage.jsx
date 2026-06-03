import { Heart } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const base_url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_API_URL_IMAGE;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  //  FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${base_url}/products/get/${id}`);

      const data = response.data?.product;

      if (data) {
        setProduct(data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  //  CHECK IF ALREADY WISHLISTED
  const checkWishlist = async (productData) => {
    try {
      if (!user || !productData) return;

      const res = await axios.get(`${base_url}/wishlist/${user.id}`);

      const exists = res.data.wishlist.some(
        (item) => item.id === productData.id,
      );

      setIsWishlisted(exists);
    } catch (err) {
      console.log("Wishlist check error:", err);
    }
  };

  // authenitication check
  const isAuthenticated = () => {
    return user && token;
  };

  //  HANDLE ADD TO CART
  const handleAddToCart = async () => {
    try {
      if (!isAuthenticated()) {
        toast("Please login first");
        return;
      }

      await axios.post(
        `${base_url}/cart/add`,
        {
          user_id: user.id,
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast("Added to cart successfully ");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  // HANDLE WISHLIST TOGGLE
  const handleWishlist = async () => {
    try {
      if (!isAuthenticated()) {
        toast("Please login first");
        return;
      }

      if (isWishlisted) {
        await axios.delete(`${base_url}/wishlist/remove`, {
          data: {
            user_id: user.id,
            product_id: product.id,
          },
        });

        setIsWishlisted(false);
      } else {
        // ADD
        await axios.post(
          `${base_url}/wishlist/add`,
          {
            user_id: user.id,
            product_id: product.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      checkWishlist(product);
    }
  }, [product]);

  if (loading) {
  return (
    <div className="text-center p-10">Loading product details...</div>
  );
}

  if (!product) {
    return (
      <div className="text-center p-10 text-red-500">Product not found</div>
    );
  }

  return (
    <>
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="w-full">
            <div className=" p-4 rounded-2xl">
              <img
                 src={`${image_url}/${product?.productImage}`}
                alt={product?.productName}
                className="w-full h-62 sm:h-87 md:h-112 object-cover object-center rounded-xl"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-3 lg:sticky top-24 h-fit">
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
              {product?.productName}
            </h1>

            <p className="text-orange-500 text-2xl font-bold">
              ₹{Number(product?.productPurchasePrice).toFixed(2)}
            </p>

            <p className="font-bold">
              {product.productInstock > 0 ? (
                    <p className="text-green-600 text-sm"></p>
                  ) : (
                    <p className="text-red-600 text-sm">Out of Stock</p>
                  )}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {product?.productDescription}
            </p>
            

            {/* QUANTITY + BUTTONS */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-full sm:w-24 border border-gray-600  p-3 text-center rounded-lg"
              />

              <div className="flex flex-wrap gap-3 w-full">
                {/* WISHLIST */}
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center transition cursor-pointer 
            ${
              isWishlisted
                ? "bg-red-600 text-white"
                : "hover:bg-red-600 hover:text-white"
            }`}
                >
                  <Heart size={18} fill={isWishlisted ? "white" : "none"} />
                </button>
                {/* ADD TO CART */}
                <button
                  onClick={handleAddToCart}
                  disabled={product?.productInstock === 0}
                  className={`flex-1 cursor-pointer text-white px-5 py-3 rounded-lg ${
                    product?.productInstock === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-600"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* META */}
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <p>
                <b>SKU:</b> {product?.productSKU}
              </p>
              <p>
                <b>Category:</b> {product?.productCategory}
              </p>
              <p>
                <b>Size:</b> {product?.productSize}
              </p>
              <p>
                <b>Color:</b> {product?.productColor}
              </p>
              <p>
                <b>Stock:</b> {product?.productInstock}
              </p>
              <p>
                <b>Stock:</b> {product?.BrandName}
              </p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            {product?.productDescription}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
