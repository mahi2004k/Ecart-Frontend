import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getallproducts`,
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(allProducts.length === 0){
      return;
    }

    let filtered = [...allProducts]

    if(search.trim() !== ""){
      filtered = filtered.filter(p=>p.productName.toLowerCase().includes(search.toLowerCase()))
    }

    if(category !== "All"){
      filtered = filtered.filter(p=>p.category === category)
    }

    if(brand !== "All"){
      filtered = filtered.filter(p=>p.brand === brand)
    }

    filtered = filtered.filter(p=>p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1])

    if(sortOrder === "lowtoHigh"){
      filtered.sort((a,b) => a.productPrice - b.productPrice)
    }else if(sortOrder === "hightoLow"){
      filtered.sort((a,b) => b.productPrice - a.productPrice)
    }

    dispatch(setProducts(filtered))
  }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch])

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-35 pb-10 bg-yellow-50 min-h-screen">

      <div className="max-w-7xl mx-auto flex gap-7">

        {/* Sidebar */}
        <FilterSidebar 
          search={search}
          setSearch={setSearch} 
          brand={brand}
          setBrand={setBrand} 
          category={category}
          setCategory={setCategory}
          allProducts={allProducts} 
          priceRange={priceRange} 
          setPriceRange={setPriceRange}
        />

        {/* Main Section */}
        <div className="flex flex-col flex-1">

          {/* Sort Dropdown */}
          <div className="flex justify-end mb-4">
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[200px] border-yellow-300 focus:ring-yellow-500">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowtoHigh">Price: Low to High</SelectItem>
                  <SelectItem value="hightoLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;