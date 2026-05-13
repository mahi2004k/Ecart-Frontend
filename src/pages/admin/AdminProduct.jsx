import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [searchProduct, setSearchProduct] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.category.toLowerCase().includes(searchProduct.toLowerCase())
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
  }
  if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);
    formData.append("productDesc", editProduct.productDesc);

    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Product updated successfully!");
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.updatedProduct : p
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product!");
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((p) => p._id !== productId);
      dispatch(setProducts(remainingProducts));
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-[350px] py-20 px-20 flex flex-col gap-3 min-h-screen min-w-screen bg-yellow-50">
      
      {/* Top Bar */}
      <div className="flex justify-between">

        {/* Search */}
        <div className="relative bg-white rounded-lg border border-yellow-200">
          <Input
            type="text"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search Products..."
            className="w-[400px]"
          />
          <Search className="absolute right-3 top-2 text-yellow-600" />
        </div>

        {/* Sort */}
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white border-yellow-200">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      {filteredProducts.map((product, index) => {
        return (
          <Card
            key={index}
            className="px-4 border border-yellow-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">

              {/* Left */}
              <div className="flex gap-2 items-center">
                <img
                  src={product.productImg[0].url}
                  alt=""
                  className="w-25 h-25"
                />
                <h1 className="font-bold w-96 text-gray-700">
                  {product.productName}
                </h1>
              </div>

              {/* Price */}
              <h1 className="font-semibold text-gray-800">
                ₹{product.productPrice}
              </h1>

              {/* Actions */}
              <div className="flex gap-3">

                {/* Edit */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      onClick={() => {
                        setOpen(true);
                        setEditProduct(product);
                      }}
                      className="text-yellow-600 cursor-pointer hover:text-yellow-700"
                    />
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Make changes to your product here.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">

                      <div className="grid gap-2">
                        <Label>Product Name</Label>
                        <Input
                          type="text"
                          value={editProduct?.productName}
                          onChange={handleChange}
                          name="productName"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={editProduct?.productPrice}
                          onChange={handleChange}
                          name="productPrice"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Brand</Label>
                          <Input
                            type="text"
                            value={editProduct?.brand}
                            onChange={handleChange}
                            name="brand"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Category</Label>
                          <Input
                            type="text"
                            value={editProduct?.category}
                            onChange={handleChange}
                            name="category"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                          name="productDesc"
                          value={editProduct?.productDesc}
                          onChange={handleChange}
                          className="focus:ring-1 focus:ring-yellow-500"
                        />
                      </div>

                      <ImageUpload
                        productData={editProduct}
                        setProductData={setEditProduct}
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button
                        onClick={handleSave}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="text-red-500 cursor-pointer hover:text-red-600" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => deleteProductHandler(product._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProduct;