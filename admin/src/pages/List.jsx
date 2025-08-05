import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function List({token}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;
    
      const token = localStorage.getItem('admin-token'); 

    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'DELETE',
          headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete product');

      // Update list
      setList((prevList) => prevList.filter((item) => item.id !== id));
      toast.success('Product removed successfully');
    } catch (err) {
      toast.error('Error removing product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <Toaster position="top-center" />

      <p className="mb-2 text-lg font-semibold">All Products List</p>

      {/* ---------- List Table Header --------- */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold rounded">
        <span>Image</span>
        <span>Name</span>
        <span > Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* ---------- Product Rows --------- */}
      <div className="flex flex-col gap-2 mt-2">
        {list.map((product) => (
          <div
            key={product.id}
            className="grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-1 gap-y-2 py-2 px-4 border rounded hover:bg-gray-50 transition"
          >
            <div className="flex md:block items-center gap-3">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/50'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50';
                }}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="md:hidden font-medium">{product.name}</div>
            </div>

            <div className="hidden md:block font-medium">{product.name}</div>
            <div className="text-sm text-gray-700">{product.category || 'N/A'}</div>
            <div className="text-sm font-semibold text-gray-700">₹{product.price}</div>

            <p
              onClick={() => handleDelete(product.id)}
              className="text-right md:text-center text-lg cursor-pointer transition"
              title="Remove product"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
