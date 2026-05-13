import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  addAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!data?.success) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      console.log("Razorpay data", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id, // Order ID from backend
        name: "Ecart Store",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            if (verifyRes.data.success) {
              toast.success("Payment successful! Your order has been placed.");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error(
                "Payment verification failed. Please contact support.",
              );
            }
          } catch (error) {
            toast.error("Error verifying payment. Please contact support.");
          }
        },
        modal: {
          ondismiss: async function () {
            // handle user closing the popup
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            toast.error("Payment cancelled.");
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNo,
        },
        theme: {
          color: "#FFFF00",
        },
      };

      const rzp = new window.Razorpay(options);

      // listen for payment failures
      rzp.on("payment.failed", async function (response) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/verify-payment`,
          {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.error("payment failed. please try again")
      });

      rzp.open()
    } catch (error) {
      console.error(error)
      toast.error("something went wrong while processing payment")
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid place-items-center p-10">
      <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
        {/* LEFT SIDE */}
        <div className="space-y-4 p-6 bg-white rounded-xl shadow">
          {showForm ? (
            <>
              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                Save & Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Saved Addresses</h2>

              {addresses.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`border p-4 rounded-lg cursor-pointer ${
                    selectedAddress === index
                      ? "border-yellow-600 bg-yellow-50"
                      : ""
                  }`}
                >
                  <p>{addr.fullName}</p>
                  <p>{addr.phoneNo}</p>
                  <p>{addr.email}</p>
                </div>
              ))}

              <Button onClick={() => setShowForm(true)} className="w-full">
                + Add New Address
              </Button>

              <Button
                disabled={selectedAddress === null || loading}
                onClick={handlePayment}
                className="w-full bg-yellow-600"
              >
                {loading ? "Processing..." : "Proceed To Payment"}
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
