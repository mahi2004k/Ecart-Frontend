import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({ search, setSearch, category, setCategory, brand, setBrand, setPriceRange, allProducts, priceRange }) => {
  const Categories = allProducts.map((p) => p.category);
  const uniqueCategories = ["All", ...new Set(Categories)];

  const brands = allProducts.map((p) => p.brand);
  const uniqueBrands = ["All", ...new Set(brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  }

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if(value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  }

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if(value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  }

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 100000]);
  }

  return( 
  <div className="bg-yellow-50 mt-10 p-4 rounded-md h-max hidden md:block w-64 border border-yellow-200 shadow-sm">

    {/* search */}
    <Input 
      type='text' 
      placeholder='Search...' 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='bg-white p-2 rounded-md border-yellow-300 border-2 w-full focus:ring-2 focus:ring-yellow-500'
    />

    {/* category */}
    <h1 className="mt-5 font-semibold text-xl text-yellow-700">Categories</h1>
    <div className="flex flex-col gap-2 mt-2">
      {
        uniqueCategories.map((item, index)=>(
          <div key={index} className="flex items-center gap-2">
            <input 
              type='radio' 
              checked={category === item} 
              onChange={() => handleCategoryClick(item)}
              className="accent-yellow-500"
            />
            <label>{item}</label>
          </div>
        ))
      }
    </div>

    {/* brands */}
    <h1 className="mt-5 font-semibold text-xl text-yellow-700">Brands</h1>
    <select 
      className="bg-white w-full p-2 border-yellow-300 border-2 rounded-md focus:ring-2 focus:ring-yellow-500" 
      value={brand} 
      onChange={handleBrandChange}
    >
      {
        uniqueBrands.map((item, index)=>(
          <option key={index} value={item}>{item.toUpperCase()}</option>
        ))
      }
    </select>

    {/* price range */}
    <h1 className="mt-5 font-semibold text-xl text-yellow-700">Price Range</h1>
    <div className="flex flex-col gap-2">
      <label className="text-gray-700">
        Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
      </label>

      <div className="flex gap-2 items-center">
        <input 
          type="number" 
          min="0" 
          max="5000" 
          value={priceRange[0]} 
          onChange={handleMinPriceChange} 
          className="w-20 p-1 border border-yellow-300 rounded focus:ring-1 focus:ring-yellow-500"
        />
        <span className="font-bold">-</span>
        <input 
          type="number" 
          min="0" 
          max="500000" 
          value={priceRange[1]} 
          onChange={handleMaxPriceChange} 
          className="w-20 p-1 border border-yellow-300 rounded focus:ring-1 focus:ring-yellow-500"
        />
      </div>

      <input 
        type="range" 
        min="0" 
        max="5000" 
        step="100" 
        className="w-full accent-yellow-500" 
        value={priceRange[0]} 
        onChange={handleMinPriceChange}
      />
      <input 
        type="range" 
        min="0" 
        max="500000" 
        step="100" 
        className="w-full accent-yellow-500" 
        value={priceRange[1]} 
        onChange={handleMaxPriceChange}
      />
    </div>

    {/* Reset button */}
    <Button 
      className="bg-yellow-500 text-white mt-5 cursor-pointer hover:bg-yellow-600 w-full shadow-sm" 
      onClick={resetFilters}
    >
      Reset Filters
    </Button>

  </div>
  )
};

export default FilterSidebar;