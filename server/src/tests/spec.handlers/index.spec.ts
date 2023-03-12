import supertest from 'supertest';
import app from '../../../app';

const request = supertest(app);

describe('Test Main End Point', () => {
  it('Test Hello World Endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
