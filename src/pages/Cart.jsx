import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);

  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  const API = `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await axios.get(
        API,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product from cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-35 bg-yellow-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>

          <div className="max-w-7xl mx-auto flex gap-7">
            {/* LEFT */}
            <div className="flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => (
                <Card
                  key={index}
                  className="border border-yellow-200 shadow-sm"
                >
                  <div className="flex justify-between items-center pr-7">
                    <div className="flex items-center w-[350px]">
                      <img
                        src={product?.productId?.productImg?.[0].url}
                        alt=""
                        className="w-25 h-25 bg-yellow-50 rounded"
                      />
                      <div className="w-[280px]">
                        <h1 className="font-semibold truncate">
                          {product?.productId?.productName}
                        </h1>
                        <p className="text-lg font-bold text-yellow-600">
                          ₹{product?.productId?.productPrice?.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5 items-center">
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.productId._id,
                            "decrease",
                          )
                        }
                        variant="outline"
                        className="border-yellow-300"
                      >
                        -
                      </Button>
                      <span>{product?.quantity}</span>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.productId._id,
                            "increase",
                          )
                        }
                        variant="outline"
                        className="border-yellow-300"
                      >
                        +
                      </Button>
                    </div>

                    <p className="font-semibold">
                      ₹{product?.productId?.productPrice * product?.quantity}
                    </p>

                    <p
                      onClick={() => handleRemove(product?.productId?._id)}
                      className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT */}
            <div className="w-[400px]">
              <Card className="border border-yellow-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-yellow-700">
                    Order Summary
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart?.items?.length}) items</span>
                    <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax(5%)</span>
                    <span>₹{tax}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-yellow-600">₹{total}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Coupon Code"
                        className="border-yellow-300 focus:ring-yellow-500"
                      />
                      <Button variant="outline" className="border-yellow-300">
                        Apply
                      </Button>
                    </div>

                    <Button
                      onClick={() => navigate("/address")}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Place Order
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-yellow-300"
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600 pt-4">
                    <p>* Free shipping on orders over ₹499</p>
                    <p>* 30-day money-back guarantee</p>
                    <p>* Secure checkout with SSL encryption</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          <div className="bg-yellow-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
