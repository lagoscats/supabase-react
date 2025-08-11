// src/api/orders.js
import { supabase } from '../supabaseClient';

/**
 * Create a new order with line items in a transaction
 * @param {string} userId
 * @param {Array} items - array of { product_id, quantity, price }
 * @returns {object|null} inserted order with items or null on error
 */
export async function createOrderWithItems(userId, items) {
  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Insert order first
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total_price: totalPrice }])
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    return null;
  }

  const orderId = orderData.id;

  // Prepare order_items data
  const orderItemsData = items.map(({ product_id, quantity, price }) => ({
    order_id: orderId,
    product_id,
    quantity,
    price,
  }));

  // Insert order_items
  const { data: itemsData, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsError) {
    console.error('Error inserting order items:', itemsError);
    return null;
  }

  return { order: orderData, items: itemsData };
}
