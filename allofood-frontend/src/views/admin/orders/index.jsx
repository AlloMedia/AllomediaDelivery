import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/config/axios';
import OrderCard from './components';
import FilterAndSearch from './components/filter';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <FilterAndSearch onFilter={handleFilter} />
      </div>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;