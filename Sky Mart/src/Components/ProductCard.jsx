import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../Context/MyContext";

const ProductCard = ({ product }) => {
  let navigate = useNavigate();
  let { cartItems, setCartItems, productsData, setProductsData, isInCart } =
    useContext(MyStore);

  return (
    <div className="relative w-full max-w-75 aspect-3/4 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 group shadow-2xl text-white">
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-contain p-8 bg-zinc-900/30 transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3 backdrop-blur-[1px] bg-linear-to-t from-black/40 to-transparent">
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold block truncate">
            {product.category}
          </span>
          <h2
            className="text-base font-semibold tracking-tight text-white truncate"
            title={product.title}
          >
            {product.title}
          </h2>
          <p className="text-sm text-zinc-300 font-light">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="w-full py-2 rounded-full text-[11px] font-medium bg-zinc-850/80 border border-zinc-700/50 text-zinc-200 hover:bg-zinc-700 hover:text-white backdrop-blur-md transition active:scale-[0.96] cursor-pointer"
          >
            Details
          </button>
          {isInCart(product.id) ? (
            <button className="w-full py-2 rounded-full text-[11px] font-medium bg-green-600/30 text-white backdrop-blur-md cursor-pointer">
              ✅
            </button>
          ) : (
            <button
              onClick={() => {
                setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
              }}
              className="w-full py-2 rounded-full text-[11px] font-medium bg-white text-black hover:bg-zinc-200 backdrop-blur-md transition active:scale-[0.96] cursor-pointer"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
