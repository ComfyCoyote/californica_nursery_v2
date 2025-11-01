import React from 'react';
import { OrderItem } from '@/utils/interfaces/checkout/orderItem';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';

interface ItemProps {
  item: OrderItem;
}

const CheckoutItem: React.FC<ItemProps> = ({ item }) => {
  const { removeFromCart, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState<string>(item.quantity.toString());

  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-md transition-colors hover:bg-yellow-50`}
    >
      <div className="flex-shrink-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] p-2 md:p-4">
        <Image 
          src={item.misc.image} 
          alt={item.name} 
          loading='eager'
          width={150} 
          height={150} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-lg font-bold mb-1">{item.name}</p>
        <p className="text-gray-700 mb-1">Price: ${item.misc.price/100}</p>
        <p className="text-gray-700 mb-2">Quantity: 
          <input 
            type="number"  
            value={quantity}
            min={1}
            className="w-16 ml-2 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1) {
                setQuantity(value.toString());
                updateItemQuantity(e, item.catalogObjectId);
              }
            }}
          />
        </p>
      </div>
      <button
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={(e) => removeFromCart(e, item.catalogObjectId)}
        >
          Remove Item
        </button>
    </div>
  );
};

export default CheckoutItem;
