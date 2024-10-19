import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/config/axios';
import OrderCard from './components';
import FilterAndSearch from './components/filter';
import OrderDetailsModal from './components/modal';
import EditOrderModal from './components/modal/edit';
import { toast, ToastContainer } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/manager/orders');
      setOrders(response.data);
      setFilteredOrders(response.data); // Initialize filtered orders
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    const { status } = filters;
    if (status) {
      setFilteredOrders(orders.filter(order => order.status === status));
    } else {
      setFilteredOrders(orders);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/manager/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh the order list
      
      toast.success('Order status updated successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      {loading ? (
        <span className="h-screen flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Loading...
      </span>
      ) : (
        <>
          <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <FilterAndSearch onFilter={handleFilter} />
          </div>
          { filteredOrders.length > 0
              ? 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {
                    filteredOrders.map((order) => (
                      <OrderCard key={order._id} order={order} onClick={() => openModal(order)} onEdit={() => openEditModal(order)} />
                    ))
                  }
                </div>
              :
                <p className="md:mt-32 text-center text-gray-400">No orders found</p>
          }
        </>
      )}
      <OrderDetailsModal isOpen={isModalOpen} onRequestClose={closeModal} order={selectedOrder} />
      <EditOrderModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} order={selectedOrder} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default Orders;