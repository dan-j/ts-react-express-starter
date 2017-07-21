import app from '../../app';
import supertest from 'supertest';

type Response = supertest.Response;

describe('/greet', () => {

    it('should return a greeting', async () => {
        const response: Response = await supertest(app).get('/greet');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello from express!');
    });
});
