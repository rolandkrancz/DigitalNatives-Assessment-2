import { render, screen } from "@testing-library/react";
import { TEST_USERS } from "../../mocks/test-data";
import { server } from '../../mocks/server';
import { rest } from 'msw';
import Home from "./Home";

describe('Home page tests', () => {
    test('Fetch and render all users.', async () => {
        render(<Home  />);
        const users = await screen.findAllByRole('listitem');
        expect(users).toHaveLength(TEST_USERS.length);
    });

    test('Render error message.', async () => {
        server.use(
            rest.get('https://assessment-users-backend.herokuapp.com/users'),
            (res, req, ctx) => {
                return res(ctx.status(500));
            }
        )

        render(<Home />);
        const error = await screen.findByText('Error: Could not fetch users.');
        expect(error).toBeInTheDocument();
    });
});