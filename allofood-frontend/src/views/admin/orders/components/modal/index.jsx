import React from 'react';
import Modal from 'react-modal';
import './styles.css';
import defaultImg from '../../../../../assets/img/avatars/avatar1.png';
import statusStyles from '../../../../../helpers/status-data';

Modal.setAppElement('#root');

const OrderDetails = ({ isOpen, onRequestClose, order }) => {
  if (!order) return null;
  const { bgColor, icon } = statusStyles[order.status] || {};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Order Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-4">
        <div className='flex justify-between'>
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <button onClick={onRequestClose} className="float-right h-fit text-gray-400 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className='w-full flex items-center'>
            <img className="w-10 h-10 rounded-lg mr-3" src={order.user.image || defaultImg} alt={`${order.user.name} avatar`} />
            <div>
              <div className="font-semibold text-gray-900">{order.user.name}</div>
              <div className="text-sm text-gray-500">order #{order._id.slice(-4)}</div>
            </div>
          </div>
          <div className='w-1/2 text-center'>
            <div className={`text-[0.88rem] py-1 px-3 flex items-center justify-center space-x-1 rounded-full font-bold ${bgColor}`}>
              <span>{icon}</span>
              <span>{order.status}</span>
            </div>
          </div>
        </div>
        <div className='font-semibold'>
          <p>Transaction Details</p>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right mb-2 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="pr-6 py-3">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Qty
                </th>
                <th scope="col" className="pl-6 py-3 text-end">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((el) => (
                <tr key={el._id} className="bg-white dark:bg-gray-800 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="pr-6 py-2">{el.item.name}</td>
                  <td className="px-6 py-2 text-center">{el.quantity}</td>
                  <td className="pl-6 py-2 text-end">${el.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='py-2 border-dotted border-t-2 text-sm  flex justify-between'>
            <p>items (4)</p>
            <p>${order.totalPrice.toFixed(2)}</p>
          </div>
          <div className='py-2 border-t text-sm flex justify-between'>
            <p>Tax</p>
            <p>$3.45</p>
          </div>
          <div className='pt-2 border-dotted border-t-2 text-sm font-bold flex justify-between'>
          <span>Total</span>
          <p>${order.totalPrice.toFixed(2)}</p>
        </div>
        </div>
        <button onClick={onRequestClose} className="w-full mt-4 bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300">Close</button>        
      </div>
    </Modal>
  );
};

export default OrderDetails;