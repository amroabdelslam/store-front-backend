"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const products_model_1 = require("../../models/products_model");
const store = new products_model_1.ProductStore();
describe('Product Model Exist', () => {
    it('should have a createProduct  method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a get all Products method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a getProductById method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a update Product method', () => {
        expect(store.patch).toBeDefined();
    });
    it('should have a deleteProduct method', () => {
        expect(store.delete).toBeDefined();
    });
});
describe('Product Model Operations', () => {
    it('Should Return One products Depend BY ID', async () => {
        const result = await store.show('1');
        expect(result.name).toEqual('Boot');
        expect(result.price).toEqual(400);
        expect(result.category).toEqual('Winter Shoes');
    });
});
it('Should Create New Product', async () => {
    const Products = {
        name: 'Boot',
        price: 400,
        category: 'Winter Shoes',
    };
    const result = await store.create(Products);
    expect(result).toEqual({
        id: 2,
        name: 'Boot',
        price: 400,
        category: 'Winter Shoes',
    });
});
