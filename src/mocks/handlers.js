import { rest } from 'msw';
import { TEST_USERS } from './test-data';

export const handlers = [
    rest.get('https://assessment-users-backend.herokuapp.com/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(TEST_USERS));
    })
]