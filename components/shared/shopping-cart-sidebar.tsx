'use client'

import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ShoppingCart: React.FC = () => {
  const { orderItems, removeFromCart, open, toggleCart } = useCart();
  const pathname = usePathname();

  return (
    <div className={`fixed right-0 top-0 w-full md:w-[320px] md:h-full h-[95vh] bg-darkBrown transition-all duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="flex justify-between items-center p-4 border-b border-cream/20">
        <h2 className="text-cream text-xl">Shopping Cart</h2>
        <button 
          onClick={toggleCart} 
          className="w-[20px] md:w-[20px] text-cream hover:text-lime"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        {orderItems.length === 0 ? (
          <p className="text-cream">No items in the cart</p>
        ) : (
          orderItems.map((item) => (
            <div key={item.id} className="flex md:w-[300px] w-[360px] justify-between items-center mb-4">
              <div>
                <p className="text-cream">{item.name}</p>
              </div>
              <button 
                onClick={(e) => removeFromCart(e, item.catalogObjectId)}
                className="px-4 py-2 border-darkBrown text-darkBrown rounded hover:text-cream hover:border-cream text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="absolute cursor-pointer bottom-0 left-0 right-0 bg-lime hover:bg-lime/90 p-4">
        <Link href={`/checkout?redirect=/plants`}>
          <button 
            disabled={orderItems.length === 0}
            className="w-[360px] md:w-full cursor-pointer bg-lime text-black py-2 px-4 rounded-lg text-sm hover:bg-lime/90 disabled:cursor-not-allowed"
            onClick={checkoutClicked}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );

  function checkoutClicked() {
    const redirectPath = pathname.split("/")[1];
    sessionStorage.setItem("redirectPath", redirectPath);
  }

};

export default ShoppingCart;
