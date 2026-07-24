import Navbar from "./Components/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import { useContext, useEffect } from "react";
import axios from "axios";
import { MyStore } from "./Context/MyContext";
import Footer from "./Components/Footer";

const App = () => {
  let { productsData, setProductsData, currentUser } = useContext(MyStore);

  let products = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setProductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    products();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white p-5 flex flex-col">
      {currentUser ? (
        <div>
          <Navbar />
        </div>
      ) : null}
      <div>
        <AppRoutes />
      </div>
      {currentUser ? (
        <div>
          <Footer />
        </div>
      ) : null}
    </div>
  );
};

export default App;
