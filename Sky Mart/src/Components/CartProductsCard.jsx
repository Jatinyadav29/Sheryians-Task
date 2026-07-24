import { useContext } from "react";
import { MyStore } from "../Context/MyContext";
import { Trash2, Star, Minus, Plus } from "lucide-react";

const CartProductsCard = ({ cartItems }) => {
  const itemTotal = (cartItems.price * cartItems.quantity).toFixed(2);
  let { incQuantity, decQuantity, setCartItems } = useContext(MyStore);

  let remove = () => {
    setCartItems((prev) => prev.filter((item) => cartItems.id !== item.id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-zinc-800/80 p-4 sm:p-5 rounded-2xl bg-zinc-900/40 backdrop-blur-sm w-full text-white transition hover:border-zinc-700/80 shadow-lg">
      <div className="flex items-center gap-4 overflow-hidden w-full sm:w-auto">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white p-2 shrink-0 flex items-center justify-center">
          <img
            src={cartItems.image}
            alt={cartItems.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] tracking-widest text-zinc-500 font-semibold block uppercase">
            {cartItems.category}
          </span>
          <h2
            className="text-white font-semibold text-sm sm:text-base truncate max-w-55 md:max-w-70"
            title={cartItems.title}
          >
            {cartItems.title}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-zinc-400 text-xs font-light">
              ${Number(cartItems.price).toFixed(2)} each
            </p>
            {cartItems.rating && (
              <span className="text-amber-400 text-xs flex items-center gap-1 font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {cartItems.rating.rate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
        <div className="flex items-center gap-2 border border-zinc-800 rounded-full bg-zinc-950 px-3 py-1">
          <button
            onClick={() => {
              cartItems.quantity === 1 ? remove() : decQuantity(cartItems.id);
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition active:scale-90 cursor-pointer select-none"
            title="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="text-xs font-semibold w-6 text-center select-none text-white">
            {cartItems.quantity}
          </span>

          <button
            onClick={() => {
              incQuantity(cartItems.id);
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition active:scale-90 cursor-pointer select-none"
            title="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="text-right min-w-18.75">
          <span className="text-xs text-zinc-500 block">Total</span>
          <span className="text-sm sm:text-base font-semibold text-white block">
            ${itemTotal}
          </span>
        </div>

        <button
          onClick={remove}
          className="p-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-950/50 transition duration-200 active:scale-95 cursor-pointer"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartProductsCard;
