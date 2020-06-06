const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  
  it('it should be able to authenticate with ID', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APAE - Centro',
        email: 'contato@apae.com.br',
        whatsapp: '63988112222',
        city: 'Palmas',
        uf: 'TO',
      });

    const { id } = response.body;

    const session = await request(app)
      .post('/sessions')
      .send({ id });

    const ong = session.body;

    expect(ong).toHaveProperty('name');
    expect(ong.name).toEqual('APAE - Centro');
  })
});