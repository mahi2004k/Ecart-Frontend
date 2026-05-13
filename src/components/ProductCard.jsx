import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
  const { productImg, productName, productPrice } = product;
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCart = async(productId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/add`, {productId}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success("Product added to cart")
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="shadow-md rounded-lg overflow-hidden h-max bg-yellow border border-yellow-100 hover:shadow-xl transition duration-300">
      
      <div className="w-full h-full aspect-square overflow-hidden bg-yellow-50">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <img
            onClick={()=> navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt=""
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        )}
      </div>

      {loading ? (
        <div className="p-2 space-y-2">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[150px] h-8" />
        </div>
      ) : (
        <div className="px-3 py-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2 text-gray-800">
            {productName}
          </h1>

          <h2 className="font-bold text-yellow-600 text-lg">
            ₹{productPrice}
          </h2>

          <Button 
            onClick={() => addToCart(product._id)} 
            className="bg-yellow-500 mb-3 w-full hover:bg-yellow-600 text-white shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;