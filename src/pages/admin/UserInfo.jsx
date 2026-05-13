import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/userLogo.png";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
const UserInfo = () => {
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  address: "",
  city: "",
  zipCode: "",
  role: "user",   // important for RadioGroup
  profilePic: ""
});
  const [file, setFile] = useState(null);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-user/${userId}`,
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="pt-15 min-h-screen bg-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-yellow-50">
          <div className="flex justify-between gap-10">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>
          <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile picture"
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
              />

              <Label className="mt-4 cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 shadow-md p-5 rounded-lg bg-white border border-yellow-200"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={updateUser?.firstName || ""}
                    onChange={handleChange}
                    className="mt-1 border-yellow-300 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={updateUser?.lastName || ""}
                    onChange={handleChange}
                    className="mt-1 border-yellow-300 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={updateUser?.email || ""}
                  disabled
                  className="mt-1 bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div>
                <Label>Phone No</Label>
                <Input
                  type="tel"
                  name="phoneNo"
                  value={updateUser?.phoneNo || ""}
                  onChange={handleChange}
                  className="mt-1 border-yellow-300 focus:ring-yellow-500"
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={updateUser?.address || ""}
                  onChange={handleChange}
                  className="mt-1 border-yellow-300 focus:ring-yellow-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={updateUser?.city || ""}
                    onChange={handleChange}
                    className="mt-1 border-yellow-300 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <Label>Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={updateUser?.zipCode || ""}
                    onChange={handleChange}
                    className="mt-1 border-yellow-300 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Label className="block text-sm font-medium">Role:</Label>
                <RadioGroup
                  value={updateUser?.role || "user"}
                  onValueChange={(value) => setUpdateUser({ ...updateUser, role: value })}
                  className="flex items-center"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
