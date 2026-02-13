import { useState } from 'react';
import { assets } from "../assets/admin_assets/assets";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Add() {
  const [images, setImages] = useState([null, null, null, null]); // for preview
  const [imageFiles, setImageFiles] = useState([null, null, null, null]); // for upload
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubcategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newImageFiles = [...imageFiles];
      newImages[index] = URL.createObjectURL(file);
      newImageFiles[index] = file;
      setImages(newImages);
      setImageFiles(newImageFiles);
    }
  };

  const handleSizeToggle = (size) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", isBestseller);

      // Fix: Append images with correct field names
      imageFiles.forEach((file, index) => {
        if (file) {
          formData.append(`image${index + 1}`, file);
        }
      });

      const token = localStorage.getItem('admin-token');

      const response = await fetch(`${backendUrl}/products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product added successfully");

        // Reset form
        setProductName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubcategory('Topwear');
        setSizes([]);
        setIsBestseller(false);
        setImages([null, null, null, null]);
        setImageFiles([null, null, null, null]);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[700px] p-4">
      {/* Image Uploads */}
      <div>
        <p className="mb-2 font-medium text-gray-600">Upload Image</p>
        <div className="flex gap-4">
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
              <img
                className="w-24 h-24 object-cover border border-dashed border-gray-300 rounded-md"
                src={img || assets.upload_area}
                alt={`upload-${index}`}
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          placeholder="Type here"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md outline-none"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Product Description</label>
        <textarea
          rows="3"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md outline-none resize-none"
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">Sub Category</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700">Product Price</label>
          <input
            type="number"
            placeholder="₹"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Product Sizes</label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-1 rounded-full border text-sm ${sizes.includes(size)
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={isBestseller}
          onChange={() => setIsBestseller(!isBestseller)}
        />
        <label htmlFor="bestseller" className="text-sm text-gray-700">Add to bestseller</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 bg-black text-white py-2 hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
}

export default Add;