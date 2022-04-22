import { server } from '../index';
import request from 'supertest';

describe('GET /health', () => {

    afterAll(() => server.close());

    it('responds with status ok', async () => {

        const response = await request(server).get('/api/v1/health')
            .expect('Content-Type', /json/)
            .expect(200);
        
        expect(response.body.status).toEqual('ok');
    })
})