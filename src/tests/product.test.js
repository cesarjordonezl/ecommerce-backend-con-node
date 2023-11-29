const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /product', async () => {
    const res = await request(app).get('/product');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /product', async () => {
    const product = {
        title: 'test title',
        description: 'test description',
        brand: 'test brand',
        price: 'test price',
    }
    const res = await request(app)
        .post('/product')
        .send(product)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(product.headline);
});

test('DELETE /product/:id', async () => {
    const res = await request(app)
        .delete(`/product/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});