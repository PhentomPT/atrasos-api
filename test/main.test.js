/* eslint-disable no-undef */

const request = require('supertest');
const server = require('../index');

describe('SERVER :', () => {
  test('GET /: should respond as expected', async (done) => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Contribute to this public API via https://github.com/PhentomPT/atrasos-api');
    done();
  });

  test('GET /delays: should respond as expected', async (done) => {
    const response = await request(server).get('/delays');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('delays');
    done();
  });

  test('POST /delays: should respond as expected', async (done) => {
    const response = await request(server).post('/delays').send({
      company: 'CP',
      delay: 60,
      line: 'CASCAIS',
      direction: 'LISBON',
      status: 'ACTIVE',
    });
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Delay registered');
    done();
  });
});
