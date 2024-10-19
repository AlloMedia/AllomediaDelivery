import defaultImg from '../../../../assets/img/avatars/avatar1.png';
import { formatDate, formatTime } from '../../../../helpers/date-format';
import statusStyles from '../../../../helpers/status-data';

const OrderCard = ({ order, onClick, onEdit }) => {
  const { bgColor, icon } = statusStyles[order.status] || {};
  
  return (
    <div className="bg-white flex flex-col justify-between rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
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
        <div className='pb-2 border-b text-sm  flex justify-between'>
          <p>{formatDate(order.createdAt)}</p>
          <p>{formatTime(order.createdAt)}</p>
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
          <div className='pt-2 border-t text-sm font-bold flex justify-between'>
          <span>Total</span>
          <p>${order.totalPrice.toFixed(2)}</p>
        </div>
        </div>
      </div>

      <div className="px-4 flex items-center space-x-2 text-sm font-semibold py-3">
        <button className="bg-green-200 w-1/2 px-3 py-2 rounded-xl hover:bg-green-300 transition-colors duration-300" onClick={onClick}>See Details</button>
        <button className="bg-blue-500 text-white w-1/2 px-3 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300" onClick={onEdit}>Edit Order</button>
      </div>
    </div>
  )
};

export default OrderCard;