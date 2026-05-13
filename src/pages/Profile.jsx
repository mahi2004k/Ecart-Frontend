import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userLogo from '../assets/userLogo.png'
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";

const Profile = () => {
  const {user} = useSelector(store => store.user)
  const params = useParams()
  const userId = params.userId

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",  
    address: user?.address || "",
    city: user?.city || "",
    zipcode: user?.zipcode || "",
    profilePic: user?.profilePic || "",
    role: user?.role || "",
  })

  const [file, setFile] = useState(null)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(e.target.files[0]) });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    try {
      const formData = new FormData();
      formData.append('firstName', updateUser.firstName);
      formData.append('lastName', updateUser.lastName);
      formData.append('email', updateUser.email);
      formData.append('phoneNo', updateUser.phoneNo);
      formData.append('address', updateUser.address);
      formData.append('city', updateUser.city);
      formData.append('zipCode', updateUser.zipcode);

      if(file){
        formData.append('file', file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update/${userId}`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again later.");
    }
  }

  return (
    <div className="pt-35 min-h-screen bg-yellow-50">

      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">

        {/* Tabs */}
        <TabsList className="bg-yellow-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Orders
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <div className="flex flex-col justify-center items-center">

            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">

              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img 
                  src={updateUser?.profilePic || userLogo} 
                  alt="profile picture" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
                />

                <Label className='mt-4 cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600'>
                  Change Picture
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange}/>
                </Label>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 shadow-md p-5 rounded-lg bg-white border border-yellow-200">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input 
                      type='text' 
                      name='firstName' 
                      value={updateUser.firstName} 
                      onChange={handleChange} 
                      className='mt-1 border-yellow-300 focus:ring-yellow-500'
                    />
                  </div>

                  <div>
                    <Label>Last Name</Label>
                    <Input 
                      type='text' 
                      name='lastName' 
                      value={updateUser.lastName} 
                      onChange={handleChange} 
                      className='mt-1 border-yellow-300 focus:ring-yellow-500'
                    />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <Input 
                    type='email' 
                    name='email' 
                    value={updateUser.email} 
                    disabled
                    className='mt-1 bg-gray-200 cursor-not-allowed'
                  />
                </div>

                <div>
                  <Label>Phone No</Label>
                  <Input 
                    type='tel' 
                    name='phoneNo' 
                    value={updateUser.phoneNo} 
                    onChange={handleChange} 
                    className='mt-1 border-yellow-300 focus:ring-yellow-500'
                  />
                </div>

                <div>
                  <Label>Address</Label>
                  <Input 
                    type='text' 
                    name='address' 
                    value={updateUser.address} 
                    onChange={handleChange} 
                    className='mt-1 border-yellow-300 focus:ring-yellow-500'
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input 
                      type='text' 
                      name='city' 
                      value={updateUser.city} 
                      onChange={handleChange} 
                      className='mt-1 border-yellow-300 focus:ring-yellow-500'
                    />
                  </div>

                  <div>
                    <Label>Zip Code</Label>
                    <Input 
                      type='text' 
                      name='zipcode' 
                      value={updateUser.zipcode} 
                      onChange={handleChange} 
                      className='mt-1 border-yellow-300 focus:ring-yellow-500'
                    />
                  </div>
                </div>

                <Button 
                  type='submit' 
                  className='w-full bg-yellow-500 text-white hover:bg-yellow-600'
                >
                  Update Profile
                </Button>

              </form>
            </div>
          </div>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Profile;