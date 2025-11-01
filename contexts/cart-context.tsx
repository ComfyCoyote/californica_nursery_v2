"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Plant } from '@/utils/interfaces/product/plant';
import { Merch } from '@/utils/interfaces/product/merch';
import { Seed } from '@/utils/interfaces/product/seed';
import { OrderItem } from '@/utils/interfaces/checkout/orderItem';
import { Square } from 'square';
import dayjs from 'dayjs';
import axios from 'axios';


interface CartContextProps {
  orderItems: OrderItem[];
  calculated: string | undefined;
  addToCart: (event: React.MouseEvent<HTMLButtonElement>, product: Plant | Merch | Seed, orderItem: OrderItem) => void;
  removeFromCart: (event: React.MouseEvent<HTMLButtonElement>, orderId: string) => void;
  calculateOrder: (name?: string, email?: string, phone?: string, note?: string) => Promise<{amount: string, order: Square.Order}>;
  updateItemQuantity: (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
  open: boolean;
  toggleCart: () => void;
}

interface CartProviderProps {

    children: ReactNode
}

const CartContext = createContext<CartContextProps>({
  orderItems: [],
  calculated: '',
  addToCart: () => {},
  calculateOrder: () => Promise.resolve({amount: '', order: {} as Square.Order} ),
  updateItemQuantity: () => {},
  removeFromCart: () => {},
  open: false,
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC <CartProviderProps>= (props) => {
  const [open, setOpen] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [calculated, setCalculated] = useState<string>()

  useEffect(() => {
    const localItems = sessionStorage.getItem("orderItems")
    if(localItems){
      const obj = JSON.parse(localItems)
      setOrderItems(obj)
      
    }
  }, [])

  useEffect(() => {


    if(orderItems.length > 0){
      console.log('order items', orderItems)
      const localItems = JSON.stringify(orderItems)
      sessionStorage.setItem("orderItems", localItems)
      sessionStorage.setItem("calculated", JSON.stringify(calculated))
      calculateOrder().then((amount) => {setCalculated(amount.amount)})
    }

  }, [orderItems])

  const toggleCart = () => {
    setOpen(!open)
  }

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>, product: Plant | Merch | Seed, orderItem: OrderItem) => {
    if(orderItems.map((item) => item.catalogObjectId).indexOf(orderItem.catalogObjectId) === -1){
      setOrderItems((prev) => [...prev, orderItem])
    }
    
  };

  const removeFromCart = (event: React.MouseEvent<HTMLButtonElement>, orderId: string) => {
   
    setOrderItems((prev) => prev.filter((item: OrderItem) => item.catalogObjectId !== orderId));

  };

  const updateItemQuantity = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const newQuantity = event.target.value;

    if(newQuantity){
      const updatedItems: OrderItem[] = orderItems.map((item: OrderItem) => {
        if(item.catalogObjectId === itemId){
          const newItem = item
          newItem.quantity = newQuantity
          return newItem
        } else {
          return item
        }
      })
  
      setOrderItems(updatedItems)

    }

  }

  const createPickupFulfillment = (name: string, email: string, phone: string, note: string) => {
    const date = dayjs()
    const expires = date.add(1, 'day')
    const pickup = date.add(1, 'hour')

    const fulfillment = {
      type: 'PICKUP',
      state: 'PROPOSED',
      pickupDetails: {
        recipient: {
          displayName: name,
          emailAddress: email,
          phoneNumber: phone
        },
        expiresAt: expires.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), //get expiration time
        scheduleType: 'SCHEDULED',
        pickupAt: pickup.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), //get pickup time
        note: note
      }
    } as Square.Fulfillment

    return fulfillment
    
  }


  const createOrder = (lineItems: Square.OrderLineItem[], fulfillments: Square.Fulfillment[], locationId: string) => {


    const order: Square.Order = {
        locationId: locationId,
        lineItems: lineItems,
        fulfillments: fulfillments
      }
    
    return order
    
  }

  const calculateOrder = async (name?: string, email?: string, phone?: string, note?: string) => {

    const fulfillment = createPickupFulfillment(name ?? 'Unknown', email ?? 'Unknown', phone ?? 'Unknown', note ?? 'Unknown')

    const stJosephs = 'L3C4J69QTRCAA'

    const lineItems: Square.OrderLineItem[] = orderItems.map((item : OrderItem) => {

      const line = {
        'quantity': item.quantity,
        'appliedTaxes': item.appliedTaxes,
        'appliedDiscounts': item.appliedDiscounts,
        'catalogObjectId': item.catalogObjectId
      } as Square.OrderLineItem

      return line
    })

    const order: Square.Order = createOrder(lineItems, [fulfillment], stJosephs)

    const response = await axios.post('/api/calculateOrder', order)

    console.log('response', response)

    return {amount: response.data.amount, order: order}
  }

  

  return (
    <CartContext.Provider value={{ calculated, updateItemQuantity, addToCart, removeFromCart, orderItems, open, toggleCart, calculateOrder }}>
      {props.children}
    </CartContext.Provider>
  );
};


