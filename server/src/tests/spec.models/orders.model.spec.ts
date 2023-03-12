/* eslint-disable no-undef */
import { Order, OrdersStore } from '../../models/orders.model';
const store = new OrdersStore();

describe('Order Model Exist', () => {
  it('should have a createOrder  method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a get all Orders method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a getOrderById method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a update Order method', () => {
    expect(store.patch).toBeDefined();
  });
  it('should have a deleteOrder method', () => {
    expect(store.delete).toBeDefined();
  });
});

describe('Product Model Operations', () => {
  it('Should Return One product Depend BY ID', async () => {
    const result: Order = await store.show('1');
    expect(result.category).toEqual('boot');
    expect(result.price).toEqual(400);
    expect(result.category).toEqual('Winter Shoes');
  });
});

it('Should Create New order', async () => {
  const orders: Order = {
    product_id: 1,
    quantity: 5,
    current_mood: 'Active',
    price: 250,
    category: 'lab',
  };
  const result = await store.create(orders);
  expect(result.category).toEqual('lab');
  expect(result.price).toEqual(250);
  expect(result.quantity).toEqual(5);
});
