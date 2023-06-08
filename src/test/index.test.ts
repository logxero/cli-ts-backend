// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { startServer } from '../index';

describe('Example router test with / route', () => {
  describe('getTest', () => {
    it('Should send a request using supertest', async () => {
      const result = await request(startServer()).get('/api/v1/');
      expect(result.statusCode).toEqual(200);
    });
  });
});
