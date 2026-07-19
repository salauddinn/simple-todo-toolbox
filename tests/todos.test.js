const request = require('supertest');
const { createApp } = require('../server');
const mongoose = require('mongoose');

let app;

beforeAll(() => {
    app = createApp();
});

describe('Todos API', () => {
    it('should return health check ok', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
});
