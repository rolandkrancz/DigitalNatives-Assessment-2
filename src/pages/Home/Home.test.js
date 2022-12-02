import { fireEvent, render, screen } from "@testing-library/react";
import { TEST_USERS_11 } from "../../mocks/test-data";
import { server } from '../../mocks/server';
import { rest } from 'msw';
import Home, { USERS_PER_PAGE } from "./Home";

describe('Home page tests', () => {
    test('Fetch and render max number of users.', async () => {
        render(<Home  />);
        const users = await screen.findAllByTestId('user-card');
        expect(users).toHaveLength(USERS_PER_PAGE);
    });

    test('Pagination works', async () => {
        render(<Home  />);
        const nextButton = await screen.findByRole('button', {name: /next page/i});
        fireEvent.click(nextButton);
        const users = await screen.findAllByTestId('user-card');
        expect(users).toHaveLength(TEST_USERS_11.length - USERS_PER_PAGE);
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