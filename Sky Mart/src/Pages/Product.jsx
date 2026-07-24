import { useContext, useState } from "react";
import { MyStore } from "../Context/MyContext";
import ProductCard from "../Components/ProductCard";
import { Search } from "lucide-react";

const Product = () => {
  let { productsData } = useContext(MyStore);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    "all",
    ...Array.from(
      new Set(productsData.map((item) => item.category).filter(Boolean)),
    ),
  ];

  const filteredProducts = productsData
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "topRated")
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      if (sortBy === "lowestRated")
        return (a.rating?.rate || 0) - (b.rating?.rate || 0);
      return 0;
    });

  return (
    <div className="min-h-screen w-full pt-8 pb-20 max-w-7xl mx-auto px-4 space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-2 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950/80 rounded-full border border-zinc-800/80 w-full md:w-1/2">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3 w-3/4 justify-center md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs font-medium text-zinc-300 focus:outline-none cursor-pointer capitalize"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-zinc-900 text-white capitalize"
                >
                  {cat}
                </option>
              ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs font-medium text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
            <option value="topRated">Top Rated</option>
            <option value="lowestRated">Lowest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            return <ProductCard key={item.id} product={item} />;
          })
        ) : (
          <div className="col-span-full py-16 text-center text-zinc-500 text-sm">
            No products match your search or filter selection.
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
