import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration - Replace with actual API call
  const mockOrders = [
    {
      id: '1',
      orderId: 'ORD-2026-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        {
          productName: 'Men Round Neck Pure Cotton T-shirt',
          quantity: 2,
          size: 'M',
          price: 500
        }
      ],
      totalAmount: 1020,
      status: 'pending',
      paymentMethod: 'COD',
      date: '2026-01-30T10:30:00',
      address: {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        phone: '+91 9876543210'
      }
    },
    {
      id: '2',
      orderId: 'ORD-2026-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        {
          productName: 'Women Zip-Front Relaxed Fit Jacket',
          quantity: 1,
          size: 'L',
          price: 1200
        },
        {
          productName: 'Girls Round Neck Cotton Top',
          quantity: 2,
          size: 'S',
          price: 400
        }
      ],
      totalAmount: 2020,
      status: 'processing',
      paymentMethod: 'Online',
      date: '2026-01-31T14:20:00',
      address: {
        street: '456 Park Avenue',
        city: 'Delhi',
        state: 'Delhi',
        zipCode: '110001',
        phone: '+91 9123456789'
      }
    },
    {
      id: '3',
      orderId: 'ORD-2026-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      items: [
        {
          productName: 'Men Tapered Fit Flat-Front Trousers',
          quantity: 1,
          size: 'XL',
          price: 1500
        }
      ],
      totalAmount: 1520,
      status: 'shipped',
      paymentMethod: 'Online',
      date: '2026-01-28T09:15:00',
      address: {
        street: '789 Lake Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        phone: '+91 9988776655'
      }
    },
    {
      id: '4',
      orderId: 'ORD-2026-004',
      customerName: 'Sarah Williams',
      customerEmail: 'sarah@example.com',
      items: [
        {
          productName: 'Women Palazzo Pants',
          quantity: 3,
          size: 'M',
          price: 800
        }
      ],
      totalAmount: 2420,
      status: 'delivered',
      paymentMethod: 'COD',
      date: '2026-01-25T16:45:00',
      address: {
        street: '321 Ocean Drive',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zipCode: '600001',
        phone: '+91 9556677889'
      }
    }
  ];

  const fetchOrders = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const token = localStorage.getItem('admin-token');
      // const response = await fetch(`${backendUrl}/orders`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to fetch orders');
      // const data = await response.json();
      // setOrders(data);

      // Using mock data for now
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('admin-token');
      // const response = await fetch(`${backendUrl}/orders/${orderId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });
      // if (!response.ok) throw new Error('Failed to update status');

      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success('Order status updated successfully');
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      shipped: 'bg-purple-100 text-purple-800 border-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Orders: <span className="font-semibold text-gray-800">{orders.length}</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here once customers place them</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.orderId}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="px-6 py-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                      <p><span className="font-medium">Phone:</span> {order.address.phone}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Shipping Address</h4>
                    <div className="text-sm text-gray-600">
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state}</p>
                      <p>{order.address.zipCode}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 px-4 py-2 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.productName}</p>
                          <p className="text-gray-500 text-xs mt-0.5">Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-700">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Payment:</span> {order.paymentMethod}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-gray-900">₹{order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Update Status:
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;