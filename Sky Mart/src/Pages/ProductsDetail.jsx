import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { MyStore } from "../Context/MyContext";
import ProductCard from "../Components/ProductCard";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
} from "lucide-react";

const ProductsDetail = () => {
  const [singleProductData, setSingleProductData] = useState({});
  let { setCartItems, isInCart, productsData } = useContext(MyStore);
  let { id } = useParams();
  let navigate = useNavigate();

  const currentId = Number(id);

  let singleProduct = async () => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const filteredSuggestions = productsData?.filter(
    (item) =>
      item.id !== currentId &&
      (item.category === singleProductData.category ||
        !singleProductData.category),
  );

  const suggestedProducts =
    filteredSuggestions?.length >= 4
      ? filteredSuggestions.slice(0, 4)
      : productsData?.filter((item) => item.id !== currentId).slice(0, 4);

  return (
    <div className="min-h-screen text-white pt-6 pb-24 max-w-6xl mx-auto px-4 space-y-12">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <div className="flex items-center gap-2">
          <button
            disabled={currentId <= 1}
            onClick={() => navigate(`/product/${currentId - 1}`)}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 disabled:hover:bg-zinc-900/60 transition disabled:cursor-not-allowed"
            title="Previous Product"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs text-zinc-500 font-mono px-1">
            #{currentId}
          </span>

          <button
            disabled={
              productsData.length > 0 && currentId >= productsData.length
            }
            onClick={() => navigate(`/product/${currentId + 1}`)}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 disabled:hover:bg-zinc-900/60 transition disabled:cursor-not-allowed"
            title="Next Product"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!singleProductData.title ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-zinc-500 text-sm font-medium animate-pulse">
            Loading product details...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border border-zinc-800/80 p-6 md:p-10 rounded-3xl bg-zinc-900/30 backdrop-blur-sm shadow-2xl">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white p-10 flex items-center justify-center relative group">
            <img
              src={singleProductData.image}
              alt={singleProductData.title}
              className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-zinc-500 font-semibold block capitalize">
                {singleProductData.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                {singleProductData.title}
              </h1>
            </div>

            <div className="flex items-center justify-between border-y border-zinc-800/80 py-4">
              <div>
                <span className="text-zinc-500 text-xs block">Price</span>
                <span className="text-2xl font-semibold text-white">
                  ${singleProductData.price?.toFixed(2)}
                </span>
              </div>

              {singleProductData.rating && (
                <div className="text-right">
                  <span className="text-zinc-500 text-xs block">Rating</span>
                  <span className="text-sm font-medium text-amber-400 flex items-center gap-1 justify-end">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {singleProductData.rating.rate}{" "}
                    <span className="text-zinc-500 text-xs">
                      ({singleProductData.rating.count} reviews)
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Description
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {singleProductData.description}
              </p>
            </div>

            <div className="pt-2">
              {isInCart(singleProductData.id) ? (
                <button className="w-full py-3.5 rounded-full text-xs font-semibold bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 flex items-center justify-center gap-2 cursor-default">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Item Already in Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCartItems((prev) => [
                      ...prev,
                      { ...singleProductData, quantity: 1 },
                    ]);
                  }}
                  className="w-full py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 pt-8 border-t border-zinc-800/80">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              You Might Also Like
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Explore similar products from our catalog.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-medium text-zinc-400 hover:text-white transition flex items-center gap-1"
          >
            View all <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {suggestedProducts && suggestedProducts.length > 0 ? (
            suggestedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm col-span-full">
              Loading suggested products...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
